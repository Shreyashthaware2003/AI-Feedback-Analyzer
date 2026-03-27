import { Card, CardContent } from "@/components/ui/card";

export function StatsCards() {
    return (
        <div className="col-span-12 lg:col-span-4 space-y-4">
            <Card className="bg-black text-white">
                <CardContent className="p-6">
                    <p className="text-xs uppercase">Total Analyzed</p>
                    <h2 className="text-4xl font-bold">1,284</h2>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <p className="text-xs uppercase text-muted-foreground">
                        Accuracy
                    </p>
                    <h2 className="text-4xl font-bold">98.2%</h2>
                </CardContent>
            </Card>
        </div>
    );
}