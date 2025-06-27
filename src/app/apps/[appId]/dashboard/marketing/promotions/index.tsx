'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { IconCalendar, IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';

export function SeasonalPromotionsSection() {
  const promotions = [
    {
      id: 1,
      name: 'Black Friday 2023',
      period: '24/11 - 27/11',
      discount: '20% OFF',
      status: 'scheduled',
      products: 'Todos os produtos'
    },
    {
      id: 2,
      name: 'Natal 2023',
      period: '15/12 - 25/12',
      discount: '15% OFF',
      status: 'draft',
      products: 'Categoria Presentes'
    },
    {
      id: 3,
      name: 'Volta às Aulas',
      period: '01/02 - 15/02',
      discount: '10% OFF + Frete Grátis',
      status: 'active',
      products: 'Material Escolar'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Promoções Sazonais</CardTitle>
          <CardDescription>
            Crie e gerencie campanhas promocionais para datas especiais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="promo-name">Nome da Promoção</Label>
                <Input id="promo-name" placeholder="Ex: Black Friday, Natal, etc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="promo-period">Período da Promoção</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input id="promo-start" type="date" />
                  <Input id="promo-end" type="date" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="promo-type">Tipo de Promoção</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Desconto Percentual</SelectItem>
                    <SelectItem value="fixed">Desconto em Valor Fixo</SelectItem>
                    <SelectItem value="free-shipping">Frete Grátis</SelectItem>
                    <SelectItem value="bundle">Compre Junto</SelectItem>
                    <SelectItem value="gift">Brinde</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="promo-value">Valor do Desconto</Label>
                <Input id="promo-value" placeholder="Ex: 20 para 20% de desconto" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="promo-products">Produtos Incluídos</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Todos os produtos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os produtos</SelectItem>
                <SelectItem value="category">Por categoria</SelectItem>
                <SelectItem value="selected">Produtos selecionados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="promo-landing" />
            <Label htmlFor="promo-landing">Criar página de landing page especial</Label>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">Salvar como Rascunho</Button>
            <Button>Agendar Promoção</Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Promoções Agendadas e Ativas</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Desconto</TableHead>
                  <TableHead>Produtos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promotions.map((promo) => (
                  <TableRow key={promo.id}>
                    <TableCell className="font-medium">{promo.name}</TableCell>
                    <TableCell>{promo.period}</TableCell>
                    <TableCell>{promo.discount}</TableCell>
                    <TableCell>{promo.products}</TableCell>
                    <TableCell>
                      <Badge variant={
                        promo.status === 'active' ? 'default' : 
                        promo.status === 'scheduled' ? 'secondary' : 'outline'
                      }>
                        {promo.status === 'active' ? 'Ativa' : 
                         promo.status === 'scheduled' ? 'Agendada' : 'Rascunho'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <IconEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <IconTrash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}