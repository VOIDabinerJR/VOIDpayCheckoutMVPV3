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
import { IconGift, IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';

export function GiftsBonusSection() {
  const gifts = [
    {
      id: 1,
      name: 'Kit Presente',
      condition: 'Compra acima de MZN 1000',
      status: 'active',
      stock: 'Ilimitado'
    },
    {
      id: 2,
      name: 'Amostra Grátis',
      condition: 'Primeira compra',
      status: 'active',
      stock: '43 restantes'
    },
    {
      id: 3,
      name: 'E-book Exclusivo',
      condition: 'Cadastro na newsletter',
      status: 'inactive',
      stock: 'Ilimitado'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Brindes e Bônus</CardTitle>
          <CardDescription>
            Ofereça brindes e bônus para aumentar a conversão e fidelização
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gift-name">Nome do Brinde/Bônus</Label>
                <Input id="gift-name" placeholder="Ex: Kit Presente, Amostra Grátis" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gift-type">Tipo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">Brinde Físico</SelectItem>
                    <SelectItem value="digital">Bônus Digital</SelectItem>
                    <SelectItem value="discount">Cupom de Desconto</SelectItem>
                    <SelectItem value="sample">Amostra Grátis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gift-condition">Condição para Ganhar</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a condição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-purchase">Primeira Compra</SelectItem>
                    <SelectItem value="min-value">Valor Mínimo</SelectItem>
                    <SelectItem value="specific-product">Produto Específico</SelectItem>
                    <SelectItem value="newsletter">Cadastro na Newsletter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gift-value">Valor Mínimo (se aplicável)</Label>
                <Input id="gift-value" placeholder="Ex: 500 para MZN 500,00" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gift-description">Descrição do Brinde</Label>
            <Input id="gift-description" placeholder="Descreva o brinde ou bônus oferecido" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gift-stock">Estoque/Quantidade</Label>
            <Input id="gift-stock" placeholder="Deixe vazio para ilimitado" />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="gift-active" />
            <Label htmlFor="gift-active">Ativar brinde imediatamente</Label>
          </div>

          <Button className="gap-2">
            <IconPlus className="h-4 w-4" />
            Adicionar Brinde
          </Button>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Brindes Ativos</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Condição</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gifts.map((gift) => (
                  <TableRow key={gift.id}>
                    <TableCell className="font-medium">{gift.name}</TableCell>
                    <TableCell>{gift.condition}</TableCell>
                    <TableCell>{gift.stock}</TableCell>
                    <TableCell>
                      <Badge variant={gift.status === 'active' ? 'default' : 'destructive'}>
                        {gift.status === 'active' ? 'Ativo' : 'Inativo'}
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
                <CardTitle className="text-sm font-medium">Brindes Entregues</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">87</div>
                <p className="text-muted-foreground text-xs">últimos 30 dias</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium">Conversão</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">28%</div>
                <p className="text-muted-foreground text-xs">taxa de aceitação</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">MZN 1,250</div>
                <p className="text-muted-foreground text-xs">com brinde</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}