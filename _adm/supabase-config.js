// ==============================================================================
// CONFIGURAÇÃO SUPABASE — CONVITES DIGITAIS (ATELIER DOS NOIVOS)
// Suporta Supabase Online com Fallback Seguro para LocalStorage
// ==============================================================================

const SUPABASE_CONFIG = {
  url: "https://zuctjpgrddewaxjfmpli.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1Y3RqcGdyZGRld2F4amZtcGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxOTUyNDksImV4cCI6MjA5ODc3MTI0OX0.X2e0b5Pq1T8V-z87M9G_N92RkX6g-T7b1W3" // chave pública anônima
};

// Planos padrão
const DEFAULT_PLANOS = {
  light: { id: 'light', nome: 'Plano Light', preco: 99.00, descricao: 'Entrada econômica essencial' },
  silver: { id: 'silver', nome: 'Plano Silver', preco: 149.00, descricao: 'Música ambiente e galeria' },
  gold: { id: 'gold', nome: 'Plano Gold', preco: 199.00, descricao: 'Vídeo vertical no hero e storytelling' },
  premium: { id: 'premium', nome: 'Plano Premium', preco: 250.00, descricao: 'Vídeo vertical HD + Trilha sonora + Storyline + QR Code PIX' }
};

class ConvitesDB {
  static getLocalBriefings() {
    try {
      return JSON.parse(localStorage.getItem('convites_briefings_local') || '[]');
    } catch (e) {
      return [];
    }
  }

  static saveLocalBriefing(briefing) {
    const list = this.getLocalBriefings();
    briefing.id = briefing.id || 'local_' + Date.now();
    briefing.created_at = briefing.created_at || new Date().toISOString();
    briefing.status = briefing.status || 'novo';
    list.unshift(briefing);
    localStorage.setItem('convites_briefings_local', JSON.stringify(list));
    return briefing;
  }

  static async salvarBriefing(dados) {
    // 1. Salva localmente para redundância imediata
    this.saveLocalBriefing({ ...dados });

    // 2. Tenta salvar no Supabase via REST API
    try {
      const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/convites_briefings`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(dados)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn("Supabase offline ou não configurado, utilizando armazenamento local.", err);
    }
    return dados;
  }

  static async listarBriefings() {
    let remotelist = [];
    try {
      const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/convites_briefings?order=created_at.desc`, {
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        }
      });
      if (res.ok) {
        remotelist = await res.json();
      }
    } catch (err) {
      console.warn("Usando briefings locais.");
    }

    const localList = this.getLocalBriefings();
    // Combina remotos e locais sem duplicar id
    const combined = [...remotelist];
    for (const item of localList) {
      if (!combined.some(r => r.id === item.id || (r.noivo === item.noivo && r.noiva === item.noiva && r.created_at === item.created_at))) {
        combined.push(item);
      }
    }
    return combined;
  }

  static async atualizarStatusBriefing(id, novoStatus) {
    // Atualiza local
    const localList = this.getLocalBriefings();
    const found = localList.find(b => b.id === id);
    if (found) {
      found.status = novoStatus;
      localStorage.setItem('convites_briefings_local', JSON.stringify(localList));
    }

    // Atualiza Supabase
    try {
      await fetch(`${SUPABASE_CONFIG.url}/rest/v1/convites_briefings?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: novoStatus })
      });
    } catch (e) {
      console.warn("Falha ao sincronizar status no Supabase.");
    }
  }

  static async carregarPlanos() {
    try {
      const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/convites_planos`, {
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          const map = {};
          data.forEach(p => map[p.id] = p);
          return map;
        }
      }
    } catch (e) {
      console.warn("Carregando planos locais.");
    }
    const local = localStorage.getItem('convites_planos_local');
    if (local) {
      try { return JSON.parse(local); } catch(e){}
    }
    return DEFAULT_PLANOS;
  }

  static async salvarPlanos(planosMap) {
    localStorage.setItem('convites_planos_local', JSON.stringify(planosMap));

    // Salva no Supabase se disponível
    try {
      for (const [id, plano] of Object.entries(planosMap)) {
        await fetch(`${SUPABASE_CONFIG.url}/rest/v1/convites_planos?id=eq.${id}`, {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_CONFIG.anonKey,
            'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            preco: Number(plano.preco),
            updated_at: new Date().toISOString()
          })
        });
      }
    } catch (e) {
      console.warn("Falha ao sincronizar planos no Supabase.");
    }
    return planosMap;
  }
}

if (typeof window !== 'undefined') {
  window.ConvitesDB = ConvitesDB;
}
