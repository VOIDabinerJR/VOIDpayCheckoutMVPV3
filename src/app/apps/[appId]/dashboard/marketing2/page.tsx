'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  IconMail,
  IconDiscount,
  IconGift,
  IconArrowUp,
  IconShoppingCart,
  IconTags,
  IconDeviceAnalytics,
  IconPlus
} from '@tabler/icons-react';

export default function MarketingDashboard() {
  const [activeCampaign, setActiveCampaign] = useState('cashback');

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Ferramentas de Marketing</h1>
          <p className='text-muted-foreground'>
            Aumente suas vendas com nossas soluções de marketing avançadas
          </p>
        </div>
        <Button>
          <IconPlus className='mr-2 h-4 w-4' />
          Nova Campanha
        </Button>
      </div>

      <Tabs defaultValue='cashback' className='w-full'>
        <TabsList className='bg-muted/50 grid h-auto w-full grid-cols-4 p-1 lg:grid-cols-9'>
          <TabsTrigger
            value='cashback'
            className='py-2 text-xs'
            onClick={() => setActiveCampaign('cashback')}
          >
            <IconGift className='mr-1 h-4 w-4' />
            Cashback
          </TabsTrigger>
          <TabsTrigger
            value='coupons'
            className='py-2 text-xs'
            onClick={() => setActiveCampaign('coupons')}
          >
            <IconDiscount className='mr-1 h-4 w-4' />
            Cupons
          </TabsTrigger>
          <TabsTrigger
            value='orderBumps'
            className='py-2 text-xs'
            onClick={() => setActiveCampaign('orderBumps')}
          >
            <IconArrowUp className='mr-1 h-4 w-4' />
            Order Bumps
          </TabsTrigger>
          <TabsTrigger
            value='bundles'
            className='py-2 text-xs'
            onClick={() => setActiveCampaign('bundles')}
          >
            <IconShoppingCart className='mr-1 h-4 w-4' />
            Compre Junto
          </TabsTrigger>
          <TabsTrigger
            value='discounts'
            className='py-2 text-xs'
            onClick={() => setActiveCampaign('discounts')}
          >
            <IconTags className='mr-1 h-4 w-4' />
            Descontos
          </TabsTrigger>
          <TabsTrigger
            value='pixels'
            className='py-2 text-xs'
            onClick={() => setActiveCampaign('pixels')}
          >
            <IconDeviceAnalytics className='mr-1 h-4 w-4' />
            Pixels
          </TabsTrigger>
          <TabsTrigger
            value='promotions'
            className='py-2 text-xs'
            onClick={() => setActiveCampaign('promotions')}
          >
            <IconPlus className='mr-1 h-4 w-4' />
            Promoções
          </TabsTrigger>
          <TabsTrigger
            value='upsell'
            className='py-2 text-xs'
            onClick={() => setActiveCampaign('upsell')}
          >
            <IconArrowUp className='mr-1 h-4 w-4' />
            Upsell
          </TabsTrigger>
          <TabsTrigger
            value='emails'
            className='py-2 text-xs'
            onClick={() => setActiveCampaign('emails')}
          >
            <IconMail className='mr-1 h-4 w-4' />
            Emails
          </TabsTrigger>
        </TabsList>

        <div className='mt-6'>
          {/* Cashback */}
          <TabsContent value='cashback'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
              <div className='space-y-6 lg:col-span-2'>
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações de Cashback</CardTitle>
                    <CardDescription>
                      Ofereça parte do valor de volta para seus clientes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='flex items-center justify-between space-x-2'>
                      <Label htmlFor='cashback-enabled'>Ativar Cashback</Label>
                      <Switch id='cashback-enabled' />
                    </div>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='space-y-2'>
                        <Label htmlFor='cashback-type'>Tipo de Cashback</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder='Selecione o tipo' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='percentage'>
                              Percentual
                            </SelectItem>
                            <SelectItem value='fixed'>Valor Fixo</SelectItem>
                            <SelectItem value='tiered'>Níveis</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='cashback-value'>Valor</Label>
                        <Input id='cashback-value' placeholder='Ex: 10' />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='cashback-minimum'>
                        Valor Mínimo da Compra
                      </Label>
                      <Input
                        id='cashback-minimum'
                        placeholder='Ex: 100'
                        prefix='MZN'
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='cashback-expiry'>
                        Validade do Cashback
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder='30 dias' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='7'>7 dias</SelectItem>
                          <SelectItem value='15'>15 dias</SelectItem>
                          <SelectItem value='30'>30 dias</SelectItem>
                          <SelectItem value='60'>60 dias</SelectItem>
                          <SelectItem value='90'>90 dias</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className='mt-4 w-full'>
                      Salvar Configurações
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Regras Avançadas</CardTitle>
                    <CardDescription>
                      Defina regras específicas para diferentes produtos ou
                      clientes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <Label>Cashback para clientes VIP</Label>
                        <Switch />
                      </div>
                      <div className='flex items-center justify-between'>
                        <Label>Cashback para primeira compra</Label>
                        <Switch />
                      </div>
                      <div className='flex items-center justify-between'>
                        <Label>Cashback para categorias específicas</Label>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className='space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='flex justify-between'>
                      <span>Cashbacks concedidos</span>
                      <span className='font-medium'>1,245</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Valor total</span>
                      <span className='font-medium'>MZN 24,850.00</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Taxa de conversão</span>
                      <span className='font-medium'>18%</span>
                    </div>
                    <Separator className='my-2' />
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>
                        Último cashback:
                      </span>
                      <span>Hoje, 14:32</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pré-visualização</CardTitle>
                    <CardDescription>
                      Como aparecerá para seus clientes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='bg-muted/50 rounded-lg p-4'>
                    <div className='bg-background rounded-md border p-4'>
                      <h3 className='font-medium'>
                        Ganhe cashback nesta compra!
                      </h3>
                      <p className='text-muted-foreground mt-1 text-sm'>
                        Receba 10% de volta em sua carteira VOIDpay para usar em
                        futuras compras.
                      </p>
                      <Badge variant='outline' className='mt-2'>
                        MZN 25.00 de volta nesta compra
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Cupons */}
          <TabsContent value='coupons'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
              <div className='space-y-6 lg:col-span-2'>
                <Card>
                  <CardHeader>
                    <CardTitle>Criar Novo Cupom</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='space-y-2'>
                        <Label htmlFor='coupon-code'>Código do Cupom</Label>
                        <Input
                          id='coupon-code'
                          placeholder='Ex: BLACKFRIDAY20'
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='coupon-type'>Tipo de Desconto</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder='Percentual' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='percentage'>
                              Percentual
                            </SelectItem>
                            <SelectItem value='fixed'>Valor Fixo</SelectItem>
                            <SelectItem value='free-shipping'>
                              Frete Grátis
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='space-y-2'>
                        <Label htmlFor='coupon-value'>Valor</Label>
                        <Input id='coupon-value' placeholder='Ex: 20' />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='coupon-minimum'>Valor Mínimo</Label>
                        <Input
                          id='coupon-minimum'
                          placeholder='Ex: 100'
                          prefix='MZN'
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div className='space-y-2'>
                        <Label htmlFor='coupon-start'>Data de Início</Label>
                        <Input id='coupon-start' type='date' />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='coupon-end'>Data de Término</Label>
                        <Input id='coupon-end' type='date' />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='coupon-uses'>Número Máximo de Usos</Label>
                      <Input
                        id='coupon-uses'
                        type='number'
                        placeholder='Ilimitado se vazio'
                      />
                    </div>

                    <Button className='mt-4 w-full'>Criar Cupom</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cupons Ativos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Código</TableHead>
                          <TableHead>Desconto</TableHead>
                          <TableHead>Usos</TableHead>
                          <TableHead>Validade</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[1, 2, 3].map((item) => (
                          <TableRow key={item}>
                            <TableCell className='font-medium'>
                              SUMMER{item}0
                            </TableCell>
                            <TableCell>{item}0% OFF</TableCell>
                            <TableCell>
                              {item}2/{item * 20}
                            </TableCell>
                            <TableCell>
                              3{item}/0{item}/2023
                            </TableCell>
                            <TableCell>
                              <Badge variant='default'>Ativo</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant='ghost' size='sm'>
                                Editar
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <div className='space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='flex justify-between'>
                      <span>Cupons ativos</span>
                      <span className='font-medium'>8</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Usos totais</span>
                      <span className='font-medium'>342</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Desconto total</span>
                      <span className='font-medium'>MZN 12,450.00</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Conversão</span>
                      <span className='font-medium'>22%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pré-visualização</CardTitle>
                  </CardHeader>
                  <CardContent className='bg-muted/50 rounded-lg p-4'>
                    <div className='bg-background rounded-md border p-4'>
                      <h3 className='font-medium'>Aplicar Cupom de Desconto</h3>
                      <div className='mt-2 flex gap-2'>
                        <Input
                          placeholder='Insira o código'
                          className='flex-1'
                        />
                        <Button>Aplicar</Button>
                      </div>
                      <div className='text-success mt-2 text-sm'>
                        Cupom SUMMER20 aplicado! 20% de desconto.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Order Bumps */}
          <TabsContent value='orderBumps'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
              <div className='space-y-6 lg:col-span-2'>
                <Card>
                  <CardHeader>
                    <CardTitle>Criar Order Bump</CardTitle>
                    <CardDescription>
                      Ofereça produtos adicionais durante o checkout
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='ob-product'>Produto</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecione um produto' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='product1'>
                            Garrafa Térmica
                          </SelectItem>
                          <SelectItem value='product2'>
                            Capa Protetora
                          </SelectItem>
                          <SelectItem value='product3'>Kit Presente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='ob-position'>Posição no Checkout</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder='Após informações de envio' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='after-shipping'>
                            Após informações de envio
                          </SelectItem>
                          <SelectItem value='before-payment'>
                            Antes do pagamento
                          </SelectItem>
                          <SelectItem value='order-review'>
                            Na revisão do pedido
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='ob-offer'>Oferta Especial</Label>
                      <Input
                        id='ob-offer'
                        placeholder='Ex: 20% OFF se comprado agora!'
                      />
                    </div>

                    <div className='flex items-center space-x-2'>
                      <Switch id='ob-limited' />
                      <Label htmlFor='ob-limited'>
                        Oferta por tempo limitado
                      </Label>
                    </div>

                    <Button className='mt-4 w-full'>Criar Order Bump</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Order Bumps Ativos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produto</TableHead>
                          <TableHead>Oferta</TableHead>
                          <TableHead>Posição</TableHead>
                          <TableHead>Taxa de Aceitação</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[1, 2].map((item) => (
                          <TableRow key={item}>
                            <TableCell className='font-medium'>
                              Produto {item}
                            </TableCell>
                            <TableCell>{item}0% OFF</TableCell>
                            <TableCell>Posição {item}</TableCell>
                            <TableCell>{item}5%</TableCell>
                            <TableCell>
                              <Button variant='ghost' size='sm'>
                                Editar
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <div className='space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='flex justify-between'>
                      <span>Order Bumps ativos</span>
                      <span className='font-medium'>3</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Taxa média de aceitação</span>
                      <span className='font-medium'>18%</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Vendas adicionais</span>
                      <span className='font-medium'>MZN 8,250.00</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pré-visualização</CardTitle>
                  </CardHeader>
                  <CardContent className='bg-muted/50 rounded-lg p-4'>
                    <div className='bg-background rounded-md border p-4'>
                      <div className='flex items-start gap-3'>
                        <div className='h-16 w-16 rounded-md bg-gray-200'></div>
                        <div>
                          <h3 className='font-medium'>
                            Garrafa Térmica Premium
                          </h3>
                          <p className='text-muted-foreground text-sm'>
                            Mantenha suas bebidas quentes por 12h
                          </p>
                          <div className='mt-1 flex items-center gap-2'>
                            <span className='font-medium'>MZN 250.00</span>
                            <span className='text-muted-foreground text-sm line-through'>
                              MZN 300.00
                            </span>
                            <Badge variant='default'>20% OFF</Badge>
                          </div>
                        </div>
                      </div>
                      <div className='mt-3 flex items-center justify-between'>
                        <div className='text-success text-sm'>
                          <strong>Oferta especial!</strong> Adicione ao seu
                          pedido.
                        </div>
                        <Button size='sm'>Adicionar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Compre Junto */}
          <TabsContent value='bundles'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
              <div className='space-y-6 lg:col-span-2'>
                <Card>
                  <CardHeader>
                    <CardTitle>Criar Pacote &quot;Compre Junto&quot;</CardTitle>
                    <CardDescription>
                      Combine produtos para oferecer descontos especiais
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='bundle-name'>Nome do Pacote</Label>
                      <Input id='bundle-name' placeholder='Ex: Kit Inicial' />
                    </div>

                    <div className='space-y-2'>
                      <Label>Produtos Incluídos</Label>
                      <div className='space-y-2'>
                        {[1, 2, 3].map((item) => (
                          <div key={item} className='flex gap-2'>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder={`Produto ${item}`} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value='product1'>
                                  Produto A
                                </SelectItem>
                                <SelectItem value='product2'>
                                  Produto B
                                </SelectItem>
                                <SelectItem value='product3'>
                                  Produto C
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant='outline'>Remover</Button>
                          </div>
                        ))}
                      </div>
                      <Button variant='outline' className='mt-2'>
                        <IconPlus className='mr-2 h-4 w-4' />
                        Adicionar Produto
                      </Button>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='bundle-discount'>
                        Desconto do Pacote
                      </Label>
                      <Input id='bundle-discount' placeholder='Ex: 15' />
                    </div>

                    <div className='flex items-center space-x-2'>
                      <Switch id='bundle-limited' />
                      <Label htmlFor='bundle-limited'>
                        Oferta por tempo limitado
                      </Label>
                    </div>

                    <Button className='mt-4 w-full'>Criar Pacote</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pacotes Ativos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Produtos</TableHead>
                          <TableHead>Desconto</TableHead>
                          <TableHead>Vendas</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[1, 2].map((item) => (
                          <TableRow key={item}>
                            <TableCell className='font-medium'>
                              Pacote {item}
                            </TableCell>
                            <TableCell>{item} produtos</TableCell>
                            <TableCell>{item}5% OFF</TableCell>
                            <TableCell>{item}2 vendas</TableCell>
                            <TableCell>
                              <Button variant='ghost' size='sm'>
                                Editar
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <div className='space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='flex justify-between'>
                      <span>Pacotes ativos</span>
                      <span className='font-medium'>4</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Vendas totais</span>
                      <span className='font-medium'>78</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Ticket médio</span>
                      <span className='font-medium'>MZN 1,250.00</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Conversão</span>
                      <span className='font-medium'>15%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pré-visualização</CardTitle>
                  </CardHeader>
                  <CardContent className='bg-muted/50 rounded-lg p-4'>
                    <div className='bg-background rounded-md border p-4'>
                      <h3 className='font-medium'>
                        Frequentemente comprados juntos
                      </h3>
                      <div className='mt-3 space-y-3'>
                        {[1, 2].map((item) => (
                          <div key={item} className='flex items-center gap-3'>
                            <div className='flex items-center gap-2'>
                              <div className='h-10 w-10 rounded-md bg-gray-200'></div>
                              <span>Produto {item}</span>
                            </div>
                            <span className='ml-auto'>MZN {item}00.00</span>
                          </div>
                        ))}
                      </div>
                      <Separator className='my-3' />
                      <div className='flex justify-between font-medium'>
                        <span>Total</span>
                        <span>MZN 250.00</span>
                      </div>
                      <div className='text-success flex justify-between text-sm'>
                        <span>Você economiza MZN 50.00</span>
                        <span>20% OFF</span>
                      </div>
                      <Button className='mt-3 w-full'>
                        Adicionar ao Carrinho
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* As outras abas seguem o mesmo padrão */}
          {/* Implementar as outras abas conforme necessário */}
          {/* import { DiscountsAndEmailsSection } from './marketing-part2'; */}

          {/* // Dentro do seu componente principal
<TabsContent value="discounts">
  <DiscountsAndEmailsSection initialTab="discounts" />
</TabsContent>

<TabsContent value="emails">
  <DiscountsAndEmailsSection initialTab="emails" />
</TabsContent>
           */}
        </div>
      </Tabs>
    </div>
  );
}
