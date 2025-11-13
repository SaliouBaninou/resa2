// icons removed (not used)

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Stats = {
  totalCompanies?: number;
  totalResponses?: number;
  mostCommonObstacles?: { label: string; count: number }[];
  mostCommonTypes?: { label: string; count: number }[];
};

export function SectionCards({ stats }: { stats?: Stats }) {
  const totalCompanies = stats?.totalCompanies ?? 0;
  const totalResponses = stats?.totalResponses ?? 0;
  const obstacles = stats?.mostCommonObstacles ?? [];
  const types = stats?.mostCommonTypes ?? [];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Entreprises</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalCompanies}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">Total</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Entreprises ayant répondu</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Réponses</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalResponses}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">Total</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Réponses enregistrées</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Top obstacles</CardDescription>
          <CardTitle className="text-base font-semibold tabular-nums @[250px]/card:text-lg">
            {obstacles.slice(0, 3).map((o) => o.label).join(", ") || "—"}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Obstacles les plus fréquents</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Top automatisations</CardDescription>
          <CardTitle className="text-base font-semibold tabular-nums @[250px]/card:text-lg">
            {types.slice(0, 3).map((t) => t.label).join(", ") || "—"}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Types d&apos;automatisation fréquents</div>
        </CardFooter>
      </Card>
    </div>
  );
}
