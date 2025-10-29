// Exemplo de uso do WhatsAppIndicator no dashboard
import { WhatsAppIndicator } from "@adsmagic/react";
import { MessageCircle, Clock, TrendingUp } from "lucide-react";

function DashboardWhatsAppSection() {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem", marginTop: "2rem" }}>
      <WhatsAppIndicator
        title="Tempo Médio de Resposta"
        value="2h 15m"
        subtitle="Média dos últimos 7 dias"
        trend={{ value: "-15min", type: "positive" }}
        icon={<Clock size={16} />}
      />
      <WhatsAppIndicator
        title="Variação de Resposta"
        value="±45min"
        subtitle="Desvio padrão"
        trend={{ value: "+5min", type: "negative" }}
        icon={<TrendingUp size={16} />}
      />
      <WhatsAppIndicator
        title="Mensagens Recebidas"
        value="1.234"
        subtitle="Hoje"
        trend={{ value: "+12%", type: "positive" }}
        icon={<MessageCircle size={16} />}
      />
    </section>
  );
}

export { DashboardWhatsAppSection };