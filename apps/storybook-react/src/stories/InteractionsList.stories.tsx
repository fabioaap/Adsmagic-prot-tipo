import type { Meta, StoryObj } from "@storybook/react";
import { InteractionsList } from "../../../dashboard-react/src/components/InteractionsList";

const meta: Meta<typeof InteractionsList> = {
  title: "Componentes/Listas/InteractionsList",
  component: InteractionsList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: "Lista das últimas interações com prospects, mostrando nome, mensagem, horário e tipo."
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof InteractionsList>;

const sampleInteractions = [
  { name: 'Gabriel Torres', message: 'Solicitou proposta atualizada', time: '12:45', type: 'Chat', isRecent: true },
  { name: 'Ana Carvalho', message: 'E-mail sobre onboarding', time: 'Ontem', type: 'Email' },
  { name: 'Estúdio Pluma', message: 'Solicitou demonstração', time: 'Ontem', type: 'Ligação' },
];

export const Default: Story = {
  args: {
    interactions: sampleInteractions
  }
};

export const ManyInteractions: Story = {
  args: {
    interactions: [
      { name: 'João Silva', message: 'Pergunta sobre preços', time: '10:30', type: 'Chat', isRecent: true },
      { name: 'Maria Santos', message: 'Agendamento de reunião', time: '09:15', type: 'Email' },
      { name: 'Carlos Oliveira', message: 'Feedback sobre produto', time: 'Ontem', type: 'Ligação' },
      { name: 'Ana Costa', message: 'Solicitação de suporte', time: '2 dias', type: 'Chat' },
      { name: 'Pedro Lima', message: 'Proposta comercial', time: '3 dias', type: 'Email' },
    ]
  }
};

export const RecentOnly: Story = {
  args: {
    interactions: [
      { name: 'Lucas Ferreira', message: 'Confirmação de pedido', time: 'Agora', type: 'Chat', isRecent: true },
      { name: 'Beatriz Almeida', message: 'Atualização de status', time: '5 min', type: 'Email', isRecent: true },
      { name: 'Rafael Souza', message: 'Nova oportunidade', time: '15 min', type: 'Ligação', isRecent: true },
    ]
  }
};