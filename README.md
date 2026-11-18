# Total Quality Group Digital — Site

Site institucional da **Total Quality Group Digital**, em <https://totalqualitygroupdigital.com.br>.

O projeto é feito em **React + Vite** e é gerado como **HTML estático pré-renderizado**. As páginas são servidas prontas, sem bundle JavaScript no carregamento. A hospedagem é Apache, via **cPanel**.

---

## Páginas

| Rota | Conteúdo |
|---|---|
| `/` | Página inicial |
| `/servicos/` | Visão geral dos serviços |
| `/servicos/redes-sociais/` | Gestão de redes sociais |
| `/servicos/trafego-pago/` | Tráfego pago (Google Ads / LinkedIn Ads) |
| `/servicos/design/` | Design e identidade visual |
| `/servicos/sistemas-proprios/` | Criação de sistemas próprios |
| `/privacy-policy/` | Política de Privacidade |
| `/codigo-de-conduta/` | Código de Conduta |

---

## Estrutura do build (pasta publicada)

```
.
├── .htaccess                 # compressão, cache e cabeçalhos (Apache)
├── index.html                # página inicial
├── assets/
│   └── index-<hash>.css      # CSS único do site (nome muda a cada build)
├── servicos/
│   ├── index.html
│   ├── design/index.html
│   ├── redes-sociais/index.html
│   ├── sistemas-proprios/index.html
│   └── trafego-pago/index.html
├── privacy-policy/index.html
├── codigo-de-conduta/index.html
├── counter.js                # animação dos números da seção "Estratégia e Resultados"
├── hero-sem-icones.webp      # imagem do hero (home)
├── logo-total.webp           # logo do cabeçalho e do rodapé
├── crc-petrobras.webp        # selo CRC Petrobras (rodapé)
├── favicon.ico               # ícone da aba (16, 32 e 48 px)
├── apple-touch-icon.png      # ícone para atalho no iPhone (180 px)
├── robots.txt
└── sitemap.xml
```

---

## Desenvolvimento

```bash
npm install
npm run dev       # servidor local
npm run build     # gera a pasta de produção
npm run preview   # testa o build localmente
```

---

## Publicação (cPanel)

1. Rode `npm run build`.
2. No **Gerenciador de Arquivos** do cPanel, envie o conteúdo da pasta gerada para `public_html/`.
3. Confirme que o `.htaccess` foi enviado. Ele é um arquivo oculto: ative *Mostrar arquivos ocultos* no cPanel.
4. Apague de `public_html/assets/` os CSS de builds anteriores. Só o `index-<hash>.css` citado nos HTML atuais deve ficar.
5. Abra o site numa aba anônima e confira.

> **HTTPS:** o fim do `.htaccess` tem um redirecionamento para HTTPS comentado. Descomente só se o cPanel ainda não força HTTPS, para não criar redirecionamento duplo.

---

## Desempenho

Otimizações aplicadas, todas **sem alterar o visual**. Isso foi conferido com comparação pixel a pixel das 8 páginas em 1440, 820 e 390 px, com menus e FAQ abertos e fechados.

| Item | O que foi feito | Ganho |
|---|---|---|
| `.htaccess` | Compressão Brotli/Gzip, cache no navegador (CSS 1 ano imutável; imagens e JS 30 dias; HTML sempre revalidado), ETag removido, `nosniff` e `Referrer-Policy` | Texto da home: ~44 KB → ~9,5 KB por visita |
| CSS | Remoção de regras não utilizadas, como sobras do WordPress e layouts antigos | 30,5 KB → 23,5 KB (gzip: 6,6 → ~4,7 KB) |
| `<head>` | Preload do logo em todas as páginas; preload do hero com `fetchpriority="high"` na home; `crossorigin` desnecessário removido do CSS | Logo e hero (LCP) carregam mais cedo |
| Home | Removida a div vazia herdada do WordPress, que já ficava oculta | HTML e CSS mais enxutos |
| Selo CRC | Reduzido de 496×285 para 315×181, com `width`/`height` e `decoding="async"` | 23,2 KB → 15,1 KB, sem salto de layout |
| Favicon | `favicon.ico` e `apple-touch-icon.png` adicionados | Elimina o 404 de `/favicon.ico` a cada visita |
| Código | HTML e CSS formatados, um elemento ou declaração por linha | Leitura e manutenção mais fáceis |

### Para manter as otimizações após cada `npm run build`

| Onde no código-fonte | O que precisa estar lá |
|---|---|
| `public/` | `.htaccess`, `favicon.ico`, `apple-touch-icon.png` e `crc-petrobras.webp` (315×181) |
| `index.html` (template) | `<link rel="icon" href="/favicon.ico" sizes="any">`, `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` e `<link rel="preload" as="image" href="/logo-total.webp">` |
| Template ou prerender da home | `<link rel="preload" as="image" href="/hero-sem-icones.webp" fetchpriority="high">` |
| Componente do rodapé | `<img src="/crc-petrobras.webp" alt="CRC Petrobras" width="315" height="181" loading="lazy" decoding="async">` |
| Componente da home | Sem a div vazia `.content` / `.wp-block-group` |
| CSS | Sem as regras mortas (`.bar`, `.brand`, `.about-*`, `.legal-*`, `.service-card`, `.wp-block-*`, `.content`…) |

---

## Aplicando o patch de otimização

O arquivo `tqgb-otimizacao.patch` contém todas as mudanças acima sobre o build, com as imagens incluídas.

```bash
git apply --check tqgb-otimizacao.patch   # testa sem alterar nada
git apply tqgb-otimizacao.patch           # aplica
```

Se o build estiver numa subpasta do repositório (ex.: `dist/`), use `--directory=dist` nos dois comandos.

---

## Pendências recomendadas

- **Seção oculta de palavras-chave (home):** são 43 `<h2>` com `hidden`, alguns com erros de digitação. Texto escondido pode ser tratado como spam pelo Google. Vale remover ou transformar em conteúdo visível.
- **Favicon:** em 16 px o logo horizontal fica ilegível. Um ícone só com a folha verde, em resolução maior, seria mais reconhecível.

---

## Contato

- WhatsApp: [+55 21 99174-8370](https://wa.me/5521991748370)
- E-mail: [comercial@totalqualitygroupdigital.com.br](mailto:comercial@totalqualitygroupdigital.com.br)
- Endereço: Estrada dos Três Rios, 958 — sala 503, Rio de Janeiro
