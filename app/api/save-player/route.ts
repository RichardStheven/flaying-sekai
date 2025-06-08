import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const { name, phone, score } = body;

  if (!name || !phone || typeof score !== 'number') {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
  }

  console.log('✅ Novo jogador salvo:', { name, phone, score });

  // Aqui é onde você salvaria no banco real.
  // Você pode conectar o Clerk com Firestore, Supabase, PlanetScale etc.

  return NextResponse.json({ ok: true });
}
