# ESPECIFICACAO - VERDE CORE V2

**Status:** Aprovado para consolidacao  
**Escopo:** Interface institucional e chrome principal do produto  
**Relacionado a:** `integracao-funcional.html`, `estilos.css`, `app.js`  
**Apêndice tecnico:** `APENDICE-CROMATICO-VERDE-CORE-V2.md`

---

## 1. Tese do sistema

O **Verde Core v2** define a linguagem cromatica institucional da Adapta.

Ele substitui a logica de "um unico verde para tudo" por uma **familia tonal verde**, com papeis semanticos distintos para texto, preenchimento, apoio, contorno e sinal de alta enfase.

O objetivo e manter:

- identidade institucional forte;
- leitura monocromatica da marca;
- maior hierarquia interna na interface;
- mais respiracao entre estrutura e destaque;
- clareza de escopo para a linguagem institucional.

---

## 2. Principios

### 2.1 Monocromia por familia, nao por token unico

A interface institucional e monocromatica em verde, mas nao depende de uma unica cor para todos os elementos.  
Os componentes pertencem a uma mesma familia cromatica, com intensidades e papeis diferentes.

### 2.2 Verde = identidade e interacao

O verde continua sendo a familia principal da marca em:

- navegacao;
- icones e links;
- componentes interativos;
- acao principal;
- destaques institucionais.

### 2.3 Neutros = estrutura

Os neutros sustentam:

- fundos;
- superficies;
- texto corrido;
- separacao de blocos;
- apoio visual.

Os neutros devem ser discretamente aquecidos para conversar com a familia verde, sem virar uma segunda familia expressiva.

### 2.4 Alta enfase nao e a regra

O verde claro e quente de alta visibilidade existe no sistema, mas com uso controlado.  
Ele aparece como **sinal** e nao como base universal da interface.

### 2.5 Escopo fechado do Verde Core

Este material documenta apenas a linguagem institucional em verde.  
Outras camadas de linguagem devem ser registradas em materiais proprios, sem
interferir na definicao do Verde Core.

---

## 3. Arquitetura cromatica

O sistema se organiza em 3 camadas:

### 3.1 Paleta primitiva

Escalas base aprovadas, ainda sem funcao final.

### 3.2 Tokens semanticos

Mapeamento dos papeis da interface.

### 3.3 Regras de uso

Decisoes sobre onde cada token entra e onde nao deve entrar.

---

## 4. Estrutura das escalas

### 4.1 Familia verde

O Verde Core trabalha com uma escala curta e legivel, com poucos degraus e
distancia suficiente entre eles.

Niveis previstos:

- `green.050`
- `green.100`
- `green.signal`
- `green.300`
- `green.500`
- `green.700`
- `green.900`

### 4.2 Papel conceitual dos verdes

- `green.050` -> atmosfera muito clara e respiracao
- `green.100` -> apoio suave e fundos verdes leves
- `green.signal` -> luz da marca, modernidade, CTA de alta enfase
- `green.300` -> preenchimento controlado e ponte entre claro e medio
- `green.500` -> destaque medio, borda ativa e suporte de navegacao
- `green.700` -> verde institucional principal
- `green.900` -> verde profundo, denso e estrutural

### 4.3 Familia neutral

Os neutros acompanham a familia verde sem competir com ela.  
Eles devem permanecer discretos, estruturais e apenas levemente aquecidos.

Niveis previstos:

- `neutral.000`
- `neutral.050`
- `neutral.100`
- `neutral.300`
- `neutral.500`
- `neutral.700`
- `neutral.900`
- `neutral.950`

### 4.4 Papel conceitual dos neutros

- `neutral.000` -> superficie maxima e contraste no light
- `neutral.050` -> fundo geral claro
- `neutral.100` -> superficie sutil e divisao leve
- `neutral.300` -> texto suave no dark e bordas discretas
- `neutral.500` -> texto secundario
- `neutral.700` -> texto ou apoio estrutural intermediario
- `neutral.900` -> texto principal no light e superficie no dark
- `neutral.950` -> fundo principal no dark

### 4.5 Limite desta especificacao

Esta especificacao cobre apenas:

- familia verde;
- familia neutral;
- papeis semanticos do Verde Core;
- comportamento institucional do sistema.

---

## 5. Tokens semanticos

Este documento registra o **papel** dos tokens.  
O mapeamento exato entre tokens, escalas e valores esta no apendice tecnico.

### 5.1 Tokens estruturais

- `bg`
- `surface`
- `surfaceSubtle`
- `text`
- `textMuted`

### 5.2 Tokens de marca

- `brandInk`
- `brandFill`
- `brandFillText`
- `brandSignal`
- `brandSignalText`
- `brandSoft`
- `brandBorder`
- `brandHighlight`
- `focusRing`

### 5.3 Regra entre modos

No light e no dark, os nomes e papeis se mantem.  
O que muda entre os modos e a calibragem da intensidade, nao a funcao semantica.

---

## 6. Definicao de papeis

### 6.1 brandInk

Uso:

- links;
- icones principais;
- numeros destacados;
- tabs ativas por texto;
- labels selecionadas;
- destaques textuais curtos.

Nao usar:

- como fundo de CTA principal;
- como preenchimento universal de badges e botoes.

### 6.2 brandFill

Uso:

- botoes primarios padrao;
- barras de progresso;
- badges filled de uso recorrente;
- toggles ativos;
- pequenos preenchimentos estruturais.

Nao usar:

- para competir com `brandSignal`;
- como destaque luminoso principal da pagina.

### 6.3 brandSignal

Uso:

- CTA hero;
- acao principal especial;
- momentos de modernidade e brilho controlado;
- pontos de alta enfase em fluxos institucionais.

Nao usar:

- como cor padrao de todos os componentes;
- para pintar todo estado ativo;
- como substituto de `brandInk`, `brandFill` e `brandSoft`.

### 6.4 brandSoft

Uso:

- hover;
- selecao sutil;
- pills suaves;
- fundo de icone;
- apoios visuais leves.

### 6.5 brandBorder

Uso:

- contorno ativo;
- foco;
- estado selecionado leve;
- borda de separacao com identidade.

### 6.6 brandHighlight

Uso:

- destaque secundario;
- suporte de navegacao;
- dados destacados sem virar CTA;
- enfase intermediaria.

---

## 7. Mapa por componente

### 7.1 Botoes

**Botao primario padrao**

- background: `brandFill`
- texto: `brandFillText`

**Botao primario especial / hero**

- background: `brandSignal`
- texto: `brandSignalText`

**Botao secundario**

- fundo: transparente ou `surface`
- borda: `brandBorder`
- texto: `brandInk`

### 7.2 Links

- texto: `brandInk`
- hover: underline ou intensificacao leve

### 7.3 Badges e pills

**Filled recorrente**

- fundo: `brandFill`
- texto: `brandFillText`

**Soft**

- fundo: `brandSoft`
- texto: `brandInk`

**Sinal**

- somente quando o badge for o ponto principal de enfase

### 7.4 Tabs

- inativa: `textMuted`
- ativa por texto: `brandInk`
- borda/indicador: `brandBorder`
- fundo opcional: `brandSoft`

### 7.5 Stats

- numero: `brandInk`
- estrutura: `surface` e neutros

### 7.6 Cartoes e superficies

- fundo principal: `surface`
- variacao leve: `surfaceSubtle`
- identidade interna: `brandSoft`, `brandBorder` ou `brandInk`, conforme a funcao

### 7.7 Foco

- `focusRing`

---

## 8. Escopo do Verde Core

### 8.1 O que ele cobre

Responsavel por:

- chrome do produto;
- interface institucional;
- componentes base;
- navegacao;
- padrao recorrente da marca.

### 8.2 O que ele nao cobre

Este material nao cobre:

- camadas expressivas paralelas;
- linguagens tematicas complementares;
- exploracoes cromaticas fora da familia verde;
- qualquer sistema que nao faca parte do chrome institucional.

---

## 9. Regras de governanca

### 9.1 O que preservar

- o sistema continua monocromatico por familia;
- o verde claro quente nao volta a ser universal;
- neutros continuam subordinados ao verde;
- o escopo permanece fechado no verde institucional.

### 9.2 O que evitar

- criar novos verdes medios muito proximos entre si;
- usar `brandSignal` como acao padrao de tudo;
- reaquecer neutros a ponto de virar paleta bege;
- misturar outras linguagens cromaticas no chrome institucional.

### 9.3 Criterio para futuras decisoes

Toda nova cor ou novo uso deve responder:

1. Isso pertence ao chrome institucional ou ao conteudo expressivo?
2. Esse papel ja existe em `brandInk`, `brandFill`, `brandSignal`, `brandSoft`, `brandBorder` ou `brandHighlight`?
3. O uso aumenta a hierarquia ou volta a achatar a interface?

---

## 10. Checklist de avaliacao

Antes de aprovar uma nova aplicacao do sistema, verificar:

- A estrutura ainda respira?
- O verde continua sendo assinatura, e nao ruido?
- O CTA especial esta reservado ao que realmente precisa de alta enfase?
- Os neutros continuam discretos, mas conectados ao verde?
- O material continua fiel ao escopo verde institucional?

---

## 11. Artefato de referencia

Preview visual aprovada nesta etapa:

- `integracao-funcional.html`

Essa preview existe para validar:

- relacao entre verdes;
- relacao entre verdes e neutros;
- comportamento de light e dark mode;
- diferenca entre accent unico e familia tonal;
- uso controlado do `brandSignal`.

Os valores cromaticos exatos ficam registrados separadamente em:

- `APENDICE-CROMATICO-VERDE-CORE-V2.md`

---

## 12. Proximo passo recomendado

Com o Verde Core v2 consolidado, o proximo movimento do sistema deve ser:

1. aplicar os tokens em componentes reais;
2. documentar exemplos de implementacao;
3. manter qualquer camada complementar em documentacao separada.
