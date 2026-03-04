import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import type { PropsWithChildren } from "react";
import type React from "react";

interface Props extends PropsWithChildren {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const HeroStatCard = ({ title, children }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Heart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>{children} </CardContent>
    </Card>
  );
};
