import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const topBuyersData = [
  {
    name: 'Carlos Mbanze',
    email: 'carlos.mbanze@email.com',
    avatar: 'https://api.slingacademy.com/public/sample-users/1.png',
    fallback: 'CM',
    totalSpent: 'MZN 52,450.00',
    purchases: 24,
    lastPurchase: '15/06/2024',
    loyaltyLevel: 'Ouro'
  },
  {
    name: 'Ana Macuácua',
    email: 'ana.macuacua@email.com',
    avatar: 'https://api.slingacademy.com/public/sample-users/2.png',
    fallback: 'AM',
    totalSpent: 'MZN 48,900.00',
    purchases: 18,
    lastPurchase: '12/06/2024',
    loyaltyLevel: 'Ouro'
  },
  {
    name: 'João Sitoe',
    email: 'joao.sitoe@email.com',
    avatar: 'https://api.slingacademy.com/public/sample-users/3.png',
    fallback: 'JS',
    totalSpent: 'MZN 42,300.00',
    purchases: 15,
    lastPurchase: '10/06/2024',
    loyaltyLevel: 'Prata'
  },
  {
    name: 'Maria Chissano',
    email: 'maria.chissano@email.com',
    avatar: 'https://api.slingacademy.com/public/sample-users/4.png',
    fallback: 'MC',
    totalSpent: 'MZN 38,750.00',
    purchases: 22,
    lastPurchase: '08/06/2024',
    loyaltyLevel: 'Ouro'
  }
];

export function TopBuyers() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Top Melhores Compradores</CardTitle>
        <CardDescription>
          Clientes com maior volume de compras nos últimos 3 meses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {topBuyersData.map((buyer, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">
                #{index + 1}
              </span>
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={buyer.avatar} alt="Avatar" />
                <AvatarFallback>{buyer.fallback}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1 grid gap-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{buyer.name}</p>
                <Badge 
                  variant={
                    buyer.loyaltyLevel === 'Ouro' ? 'default' : 
                    buyer.loyaltyLevel === 'Prata' ? 'secondary' : 'outline'
                  }
                  className="text-xs"
                >
                  {buyer.loyaltyLevel}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{buyer.email}</p>
              <div className="flex gap-4 text-sm">
                <span className="text-muted-foreground">
                  {buyer.purchases} compras
                </span>
                <span className="text-muted-foreground">
                  Última: {buyer.lastPurchase}
                </span>
              </div>
            </div>
            
            <div className="ml-auto text-right">
              <p className="font-bold text-primary">{buyer.totalSpent}</p>
              <p className="text-sm text-muted-foreground">Total gasto</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}