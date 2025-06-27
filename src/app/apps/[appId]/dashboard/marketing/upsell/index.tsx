'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { IconArrowUp, IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';
import { Separator } from '@radix-ui/react-dropdown-menu';

export function UpsellCrossSellSection() {
  const offers = [
    {
      id: 1,
      trigger: 'Produto A no carrinho',
      offer: 'Produto B (combo 10% OFF)',
      position: 'Página do Carrinho',
      status: 'active'
    },
    {
      id: 2,
      trigger: 'Compra acima de MZN 500',
      offer: 'Produto C (50% OFF)',
      position: 'Checkout',
      status: 'active'
    },
    {
      id: 3,
      trigger: 'Categoria Eletrônicos',
      offer: 'Garantia Estendida',
      position: 'Página do Produto',
      status: 'inactive'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upsell & Cross-sell</CardTitle>
          <CardDescription>
            Aumente o ticket médio oferecendo produtos complementares
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="offer-trigger">Disparar quando</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o gatilho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Produto específico no carrinho</SelectItem>
                    <SelectItem value="category">Categoria no carrinho</SelectItem>
                    <SelectItem value="value">Valor mínimo no carrinho</SelectItem>
                    <SelectItem value="checkout">Durante o checkout</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="offer-product">Produto para Oferecer</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o produto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product1">Produto A</SelectItem>
                    <SelectItem value="product2">Produto B</SelectItem>
                    <SelectItem value="product3">Produto C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="offer-position">Posição da Oferta</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a posição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cart">Página do Carrinho</SelectItem>
                    <SelectItem value="product">Página do Produto</SelectItem>
                    <SelectItem value="checkout">Durante o Checkout</SelectItem>
                    <SelectItem value="post-purchase">Após a Compra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="offer-discount">Desconto Especial (opcional)</Label>
                <Input id="offer-discount" placeholder="Ex: 10 para 10% de desconto" />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="offer-active" />
            <Label htmlFor="offer-active">Ativar oferta imediatamente</Label>
          </div>

          <Button className="gap-2">
            <IconPlus className="h-4 w-4" />
            Criar Oferta
          </Button>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Ofertas Configuradas</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Disparar Quando</TableHead>
                  <TableHead>Oferta</TableHead>
                  <TableHead>Posição</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offers.map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell>{offer.trigger}</TableCell>
                    <TableCell>{offer.offer}</TableCell>
                    <TableCell>{offer.position}</TableCell>
                    <TableCell>
                      <Badge variant={offer.status === 'active' ? 'default' : 'destructive'}>
                        {offer.status === 'active' ? 'Ativa' : 'Inativa'}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium">Ofertas Aceitas</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">124</div>
                <p className="text-muted-foreground text-xs">últimos 30 dias</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">+28%</div>
                <p className="text-muted-foreground text-xs">com upsell</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium">Taxa de Aceitação</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">22%</div>
                <p className="text-muted-foreground text-xs">melhor oferta: 35%</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}