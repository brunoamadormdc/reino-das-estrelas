# Giovana & Isabella — Reino das Estrelas

Jogo de plataforma mobile em JavaScript puro e Canvas 2D. Sem dependências, fontes externas, imagens remotas ou etapa de build. Oito fases, cinco vidas iniciais (máximo de cinco), um coração extra nas fases 2/4/6/8, vida por 100 estrelas, checkpoints, estrelas, vidas extras, inimigos e um chefe final com disparos telegrafados e rajadas de três projéteis quando enfraquecido. Flores derrotam monstros no chão e pássaros; dois acertos de flores retiram um coração do chefe. Sons e trilha original sintetizados por Web Audio; iniciados pela interação de jogar e silenciáveis pelo botão de som. Falas curtas via Speech Synthesis em português, com tom agudo; voz e disponibilidade variam conforme sistema e navegador. Se não houver voz, o jogo continua com mensagens visuais. Progresso salvo no localStorage.

## Executar

Sirva a pasta `dist` com qualquer servidor estático. Por exemplo: `python3 -m http.server 8000 --directory dist`.

## Instalar e jogar sem internet

Abra o endereço publicado por HTTPS no Chrome/Edge para Android ou desktop e escolha **Instalar app** no menu do navegador. No iPhone/iPad, abra no Safari e use **Compartilhar → Adicionar à Tela de Início**. Em `localhost`, a instalação também pode ser testada sem HTTPS. Depois da primeira visita com internet e da ativação do service worker, os arquivos do jogo ficam disponíveis offline; progresso e personagem escolhidos continuam guardados no armazenamento local do navegador. Áudio e voz dependem dos recursos do dispositivo. Se limpar os dados do site, o progresso e o cache offline serão perdidos.

O manifesto e os ícones ficam em `dist/manifest.webmanifest` e `dist/`. Ao publicar alterações nos arquivos pré-armazenados, incremente `CACHE_NAME` em `dist/sw.js` para substituir o cache da versão anterior. Os PNGs podem ser recriados a partir de `dist/icon.svg` e `dist/icon-maskable.svg` com ImageMagick (`convert`), nos tamanhos declarados no manifesto e no link `apple-touch-icon`.

## Vercel

Importe este repositório, selecione **Other**, deixe Install Command e Build Command vazios e use **dist** como Output Directory. O arquivo `vercel.json` já declara a saída estática. Também é possível executar `vercel --prod` a partir desta pasta com a CLI autenticada.

## Controles

Celular: joystick virtual de movimento e botão PULAR, com suporte simultâneo por Pointer Events. Deitado oferece um campo de jogo maior. Computador: setas ou A/D, espaço ou W para pular, X/Z para disparar flores, P para pausar. Controle Bluetooth/USB reconhecido pelo navegador: analógico esquerdo ou direcional, botão A/✕ (0) para pular, B/○ ou X/□ (1 ou 2) ou gatilho direito (7) para disparar flores e Start para pausar. O controle deve estar pareado ao sistema; compatibilidade depende do navegador e do modelo. No celular, o jogo abre por padrão com o canvas ocupando a tela e os controles sobrepostos. O botão ↙ Voltar retorna à visualização normal sem reiniciar a fase; Tela cheia permite entrar novamente. O modo também está disponível no desktop. A Fullscreen API é solicitada no gesto de começar/jogar; quando o navegador não permite ocultar sua própria interface, o modo com canvas ocupando a área disponível continua funcionando. Escape também retorna ao normal ao sair da tela cheia nativa.

## Personalizar

`dist/game.js`: cores e nomes das fases em `worlds`, personagens em `sprite` e `girl`, ritmo em `SPEED`, `JUMP` e `G`, geometria em `level`. Nomes e frases iniciais em `dist/index.html`. Associação provisória: Giovana com cabelo mais liso e roupa rosa, Isabella com cabelo escuro, olhos azuis e roupa lilás. Troque após confirmar a identificação na foto.

## Desempenho e limites

Canvas de 800 × 450 na visualização normal; em tela cheia, altura interna fixa de 450 e largura adaptada à proporção da tela (180 a 1200 pixels), sem cortar o cenário ou alterar a física, sem multiplicação pelo DPR da tela, simulação fixa a 60 passos/s, partículas limitadas a 90, elementos fora da câmera descartados no desenho. Fases com limite de 5 minutos; o tempo exato depende do jogador. Deve ser validado em um Galaxy A03 real para confirmar fluidez e ergonomia. Não há telemetria ou envio da fotografia: a arte é desenhada com código.
