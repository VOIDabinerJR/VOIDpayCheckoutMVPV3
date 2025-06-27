import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const recentPaymentsData = [
  {
    id: '#PAY-2812',
    customer: 'Carlos Mbanze',
    method: 'MPesa',
    description: 'Compra de eletrônicos',
    amount: 'MZN 12,450.00',
    status: 'Completo',
    date: '15/06/2024 14:30',
    wallet: 'Carteira Digital',
  },
  {
    id: '#PAY-2811',
    customer: 'Ana Macuácua',
    method: 'Emola',
    description: 'Assinatura mensal',
    amount: 'MZN 8,900.00',
    status: 'Completo',
    date: '15/06/2024 12:15',
    wallet: 'Carteira Empresarial',
  },
  {
    id: '#PAY-2810',
    customer: 'João Sitoe',
    method: 'Visa',
    description: 'Compra de roupas',
    amount: 'MZN 5,300.00',
    status: 'Pendente',
    date: '15/06/2024 10:45',
    wallet: 'Carteira Pessoal',
  },
  {
    id: '#PAY-2809',
    customer: 'Maria Chissano',
    method: 'MPesa',
    description: 'Pagamento de serviços',
    amount: 'MZN 3,750.00',
    status: 'Completo',
    date: '14/06/2024 18:20',
    wallet: 'Carteira Digital',
  },
  {
    id: '#PAY-2808',
    customer: 'Pedro Nhate',
    method: 'Emola',
    description: 'Recarga de saldo',
    amount: 'MZN 2,200.00',
    status: 'Falhou',
    date: '14/06/2024 16:10',
    wallet: 'Carteira Empresarial',
  },
];

export function RecentPaymentsTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Últimos Pagamentos</CardTitle>
            <CardDescription>Top 5 transações recentes</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Método</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Carteira</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPaymentsData.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{payment.customer}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      payment.method === 'MPesa' ? 'default' :
                      payment.method === 'Emola' ? 'secondary' : 'outline'
                    }
                  >
                    {payment.method}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {payment.description}
                </TableCell>
                <TableCell className="font-medium">
                  {payment.amount}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      payment.status === 'Completo' ? 'default' :
                      payment.status === 'Pendente' ? 'secondary' : 'destructive'
                    }
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>{payment.wallet}</TableCell>
                <TableCell className="text-muted-foreground">
                  {payment.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}