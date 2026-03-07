# APENDICE CROMATICO - VERDE CORE V2

**Status:** Referencia tecnica complementar  
**Documento principal:** `ESPECIFICACAO-VERDE-CORE-V2.md`

---

## 1. Finalidade

Este documento existe para registrar os **valores cromaticos tecnicos** do
Verde Core v2.

Ele nao substitui a especificacao principal.  
A especificacao principal descreve:

- tese;
- principios;
- papeis;
- governanca;
- regras de uso.

Este apendice descreve:

- escalas aprovadas;
- mapeamento tecnico;
- valores por modo.

---

## 2. Paleta primitiva

### 2.1 Green scale

```txt
green.050    #F4F8F0
green.100    #DFE8D8
green.signal #BFE5AE
green.300    #AAC19D
green.500    #77937A
green.700    #33564B
green.900    #132923
```

### 2.2 Neutral scale

```txt
neutral.000  #FFFFFF
neutral.050  #F7F8F4
neutral.100  #ECEEE7
neutral.300  #C8CDC3
neutral.500  #6E786D
neutral.700  #434A43
neutral.900  #1A211C
neutral.950  #0D110E
```

---

## 3. Tokens semanticos

### 3.1 Light mode

```txt
bg               neutral.050
surface          neutral.000
surfaceSubtle    neutral.100

text             neutral.900
textMuted        neutral.500

brandInk         green.700
brandFill        green.700
brandFillText    neutral.000

brandSignal      green.signal
brandSignalText  neutral.950

brandSoft        green.100
brandBorder      green.300
brandHighlight   green.500

focusRing        green.500
```

### 3.2 Dark mode

```txt
bg               neutral.950
surface          neutral.900
surfaceSubtle    #222923

text             #F7FAF8
textMuted        neutral.300

brandInk         green.100
brandFill        green.300
brandFillText    neutral.950

brandSignal      green.signal
brandSignalText  neutral.950

brandSoft        rgba(170, 193, 157, 0.16)
brandBorder      green.500
brandHighlight   green.100

focusRing        green.300
```

---

## 4. Referencia de implementacao

Os valores acima correspondem ao estado atual da preview e dos arquivos:

- `integracao-funcional.html`
- `estilos.css`
- `app.js`

Qualquer alteracao cromatica futura deve atualizar:

1. este apendice;
2. a preview visual;
3. a especificacao principal, se houver mudanca de papel ou governanca.

Este apendice registra apenas a familia verde, a familia neutral e os tokens
institucionais do Verde Core.
