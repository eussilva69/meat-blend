import { blends } from './blends';

/**
 * Formulários que viram mensagem pronta no WhatsApp (com alternativa por e-mail).
 * `waLabel` é o rótulo usado na mensagem (ex.: "*Nome:* Ana").
 * A ordem dos campos é a ordem das linhas da mensagem; no fim entram as linhas
 * automáticas *Origem:* (UTMs) e *Página:* (de onde a pessoa veio).
 */

type FieldBase = {
  id: string;
  name: string;
  label: string;
  waLabel: string;
  required?: boolean;
  /** Mostra "(opcional)" ao lado do rótulo. */
  optional?: boolean;
  /** Mensagem de erro (pt-BR) quando o campo obrigatório está vazio. */
  error?: string;
};

export type InputField = FieldBase & {
  type: 'text';
  autoComplete?: string;
  placeholder?: string;
};

export type SelectField = FieldBase & {
  type: 'select';
  options: string[];
};

export type CheckboxGroupField = FieldBase & {
  type: 'checkboxes';
  options: string[];
};

export type TextareaField = FieldBase & {
  type: 'textarea';
  placeholder?: string;
};

export type FormField = InputField | SelectField | CheckboxGroupField | TextareaField;

/** Um item de layout: campo sozinho ou par de campos lado a lado (`.form__row`). */
export type FormRow = FormField | [FormField, FormField];

export type WhatsAppFormConfig = {
  /** Prefixo dos ids dos campos (ex.: "c" → "c-nome"), para não colidir entre formulários. */
  idPrefix: string;
  /** Primeira linha da mensagem. */
  intro: string;
  /** Assunto do e-mail alternativo. */
  subject: string;
  /** Valor fixo da linha *Página:* (senão, a página de onde a pessoa veio). */
  page?: string;
  /** Aviso de obrigatoriedade (no topo do formulário). */
  requiredNote: string;
  rows: FormRow[];
  submit: string;
  /**
   * Nota abaixo do botão. `lead` pode conter marcadores [a confirmar…].
   * O link de privacidade e o e-mail são montados pelo componente.
   */
  note: { lead?: string; privacyBefore: string; privacyText: string; privacyAfter: string };
  /** Abre o link de privacidade em nova aba (landing page). */
  privacyNewTab?: boolean;
};

/** Textos do status depois do envio (os dois formulários). */
export const formStatus = {
  opened: {
    lead: 'Falta só um passo:',
    text: 'confira a mensagem no WhatsApp e toque em Enviar. O pedido só chega para a gente depois disso.',
    retry: 'O WhatsApp não abriu? Abrir de novo',
  },
  blocked: {
    lead: 'Falta só um passo:',
    text: 'o navegador não abriu o WhatsApp sozinho. Toque no botão abaixo para abrir a sua mensagem pronta e depois toque em Enviar.',
    openButton: 'Abrir o WhatsApp com a mensagem',
  },
  email: 'Prefiro enviar por e-mail',
  noWhatsApp: 'Sem WhatsApp neste aparelho? Escreva para',
} as const;

export const genericErrors = {
  text: 'Preencha este campo.',
  select: 'Selecione uma opção.',
} as const;

/** Faixas de volume (iguais nos dois formulários e no simulador). */
export const volumeOptions = ['Até 500', 'De 500 a 1.500', 'De 1.500 a 3.000', 'Mais de 3.000', 'Ainda vou abrir'];

const nome: InputField = {
  id: 'nome',
  name: 'nome',
  label: 'Seu nome',
  waLabel: 'Nome',
  type: 'text',
  autoComplete: 'name',
  required: true,
  error: 'Diga como podemos te chamar.',
};

const negocio: InputField = {
  id: 'negocio',
  name: 'negocio',
  label: 'Nome do negócio',
  waLabel: 'Negócio',
  type: 'text',
  autoComplete: 'organization',
  placeholder: 'Hamburgueria, dark kitchen, food truck…',
  required: true,
  error: 'Informe o nome do negócio (ou do projeto, se ainda vai abrir).',
};

const cidade: InputField = {
  id: 'cidade',
  name: 'cidade',
  label: 'Cidade / UF',
  waLabel: 'Cidade',
  type: 'text',
  autoComplete: 'address-level2',
  placeholder: 'Ex.: Curitiba / PR',
  required: true,
  error: 'Informe cidade e UF para a gente checar a entrega.',
};

const volumeContato: SelectField = {
  id: 'volume',
  name: 'volume',
  label: 'Burgers vendidos por mês',
  waLabel: 'Burgers por mês',
  type: 'select',
  optional: true,
  options: volumeOptions,
};

const volumeLp: SelectField = {
  id: 'volume',
  name: 'volume',
  label: 'Quantos burgers você vende por mês?',
  waLabel: 'Burgers por mês',
  type: 'select',
  required: true,
  options: volumeOptions,
  error: 'Escolha uma faixa. Se ainda vai abrir, marque "Ainda vou abrir".',
};

/** Formulário da página /contato. */
export const contactForm: WhatsAppFormConfig = {
  idPrefix: 'c',
  intro: 'Olá, Meat Blend! Vim pelo site e quero receber amostra e preços dos blends.',
  subject: 'Pedido de amostra pelo site',
  requiredNote: 'Os campos sem “(opcional)” são obrigatórios.',
  rows: [
    [nome, negocio],
    [cidade, volumeContato],
    {
      id: 'blend',
      name: 'blend',
      label: 'Blends de interesse',
      waLabel: 'Blends de interesse',
      type: 'checkboxes',
      optional: true,
      options: blends.map((b) => b.name),
    },
    {
      id: 'msg',
      name: 'mensagem',
      label: 'Mensagem',
      waLabel: 'Mensagem',
      type: 'textarea',
      optional: true,
      placeholder:
        'Ex.: smash duplo de 80 g, uns 400 burgers por semana, chapa a gás. Quero testar o Smash e o Costela.',
    },
  ],
  submit: 'Pedir amostra pelo WhatsApp',
  note: {
    privacyBefore: 'Seus dados servem só para este contato. Veja a ',
    privacyText: 'política de privacidade',
    privacyAfter: '.',
  },
};

/** Formulário da landing page /amostra. */
export const lpForm: WhatsAppFormConfig = {
  idPrefix: 'l',
  intro: 'Olá, Meat Blend! Vim pela página de amostras e quero testar os blends na minha chapa.',
  subject: 'Pedido de amostra (landing page)',
  page: 'Landing page de amostra',
  requiredNote: 'Todos os campos são obrigatórios.',
  rows: [[nome, negocio], cidade, volumeLp],
  submit: 'Pedir amostra pelo WhatsApp',
  note: {
    lead: 'Amostra [a confirmar: grátis / R$ X] · Sem compromisso de compra [a confirmar] · Resposta [a confirmar: em até X horas úteis].',
    privacyBefore: 'Seus dados servem só para este contato (',
    privacyText: 'privacidade',
    privacyAfter: ').',
  },
  privacyNewTab: true,
};
