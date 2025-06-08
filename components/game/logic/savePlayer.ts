export async function savePlayerToDatabase(name: string, phone: string, score: number) {
    try {
      const res = await fetch('/api/save-player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, score }),
      });
  
      const data = await res.json();
      console.log('✅ Dados salvos:', data);
    } catch (err) {
      console.error('❌ Erro ao salvar jogador:', err);
    }
  }
  