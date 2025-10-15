import { ActivityPaymentsDetailView } from "src/sections/gestionEvent/situationFinanciere/ActivityPaymentsDetailView";


export default function Page({ params }: { params: { id: string } }) {
  return <ActivityPaymentsDetailView activityId={params.id} />;
}