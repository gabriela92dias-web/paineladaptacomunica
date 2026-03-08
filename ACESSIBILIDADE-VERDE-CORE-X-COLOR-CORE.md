# ACESSIBILIDADE - VERDE CORE X COLOR CORE

## 1. Objetivo

Este documento registra como o **Verde Core** e o **Color Core** podem
conviver com seguranca do ponto de vista de contraste e acessibilidade.

O foco aqui nao e discutir identidade ou linguagem.  
O foco e responder:

- quando o Verde Core pode entrar sobre o Color Core;
- quando o Color Core pode entrar sobre o Verde Core;
- quais combinacoes sao seguras;
- quais combinacoes devem ser evitadas.

---

## 2. Criterio adotado

Leitura baseada em contraste WCAG:

- **AAA-sm** = seguro para texto pequeno
- **AA-text** = seguro para texto normal
- **AA-large** = seguro apenas para texto grande / destaque
- **fail** = evitar

---

## 3. Resultado geral

### 3.1 Regra mais importante

**Os tons do Color Core nao devem ser tratados como cor de texto principal sobre
fundos claros do Verde Core.**

Em quase todos os casos, isso falha ou so passa para texto grande.

### 3.2 Regra complementar

**Quando o Color Core entra como fundo, o texto institucional deve preferir os
tons mais escuros do Verde Core ou os neutros escuros.**

Em especial:

- `green900`
- `neutral900`
- `neutral950`

sao os pares mais estaveis.

---

## 4. O que e seguro por padrao

### Seguro como texto sobre fundos Color Core

Usar preferencialmente:

- `green900`
- `neutral900`
- `neutral950`

Esses tres funcionam bem sobre todos os tons aprovados do Color Core atual.

### Seguro como apoio institucional sobre fundos Color Core claros

`green700` funciona bem sobre:

- campos altos;
- campos velados;
- alguns centros mais claros;
- alguns marca-textos mais luminosos.

Mas **nao deve ser assumido como seguro universal** sobre todos os acentos.

---

## 5. O que evitar por padrao

### Evitar

- texto Color Core sobre fundos claros do Verde Core;
- texto Color Core sobre branco;
- usar `green700` como texto padrao sobre acentos mais densos do Color Core;
- usar acentos densos do Color Core para corpo de texto.

### Motivo

Essas combinacoes tendem a:

- falhar em contraste;
- funcionar apenas em titulo grande;
- gerar leitura instavel em materiais reais.

---

## 6. Regras praticas de convivio

### Regra 1

**Color Core funciona melhor como fundo, campo ou acento.**

Nao como texto principal pequeno sobre superficies claras.

### Regra 2

**Texto institucional sobre Color Core deve ser escuro.**

Escolha recomendada:

- primeiro: `green900`
- segundo: `neutral900`
- terceiro: `neutral950`

### Regra 3

**Se a peca pede texto em verde medio (`green700`), restringir isso aos campos
mais claros do Color Core.**

Nao usar `green700` como regra geral sobre:

- acentos densos;
- centros mais saturados;
- marca-textos do Color Core.

### Regra 4

**Quando o Color Core estiver sobre base Verde Core clara, tratar os tons do
Color Core como elemento grafico, nao como texto.**

Isso vale para:

- selo;
- detalhe;
- icone;
- shape;
- linha;
- destaque grande.

Nao para:

- microtexto;
- legenda;
- corpo;
- link pequeno.

---

## 7. Leituras por familia

### 7.1 Energia

#### Seguro

- `green900` sobre todos os tons da familia
- `neutral900` / `neutral950` sobre todos os tons da familia
- `green700` sobre campos e tons mais claros

#### Cuidado

`green700` no acento denso da Energia tende a cair para contraste de texto
grande, nao texto normal.

### 7.2 Alegria

#### Seguro

- `green900` sobre todos os tons
- `neutral900` / `neutral950` sobre todos os tons

#### Cuidado

Alegria e a familia que mais rapidamente inviabiliza `green700` quando entra em:

- centro;
- marca-texto;
- denso.

Ou seja:

**Alegria pede texto mais escuro por regra.**

### 7.3 Seguranca

#### Seguro

- `green900` sobre todos os tons
- `neutral900` / `neutral950` sobre todos os tons

#### Cuidado

`green700` funciona nos campos e em alguns tons intermediarios, mas perde
seguranca no centro e no denso.

---

## 8. Decisao operacional recomendada

### Para aprovar como regra geral

**Verde Core e Color Core convivem melhor quando:**

- o Color Core ocupa o plano cromatico;
- o Verde Core escuro ocupa o plano textual/institucional;
- os neutros escuros entram como alternativa de seguranca;
- o Verde Core claro nao recebe texto do Color Core como regra.

---

## 9. Regra curta para equipe

Se for preciso resumir em uma frase:

> Quando Color Core e Verde Core convivem, o Color Core entra como campo ou
> acento, e o Verde Core mais escuro segura a leitura principal.

---

## 10. Proximo passo sugerido

Aplicar essa regra em:

- cards de campanha;
- capas;
- banners;
- pecas com CTA;
- blocos com microtexto;
- testes de impressao e tela.
