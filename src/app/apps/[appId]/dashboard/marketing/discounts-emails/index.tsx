'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  IconMail,
  IconDiscount,
  IconChevronDown,
  IconTags,
  IconPlus,
  IconTrash,
  IconEdit
} from '@tabler/icons-react';

export function DiscountsAndEmailsSection() {
  const [activeTab, setActiveTab] = useState('discounts');
  const [emailTemplates, setEmailTemplates] = useState([
    { id: 1, name: 'Abandoned Cart', trigger: '2h após abandono', status: 'active' },
    { id: 2, name: 'Confirmação de Pedido', trigger: 'Imediato', status: 'active' },
    { id: 3, name: 'Follow-up Pós-Compra', trigger: '3 dias após compra', status: 'inactive' }
  ]);

  return (
    <div className="space-y-6">
      {/* Abas de Navegação */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'discounts' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('discounts')}
        >
          <IconDiscount className="inline mr-2 h-4 w-4" />
          Descontos Progressivos
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'emails' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('emails')}
        >
          <IconMail className="inline mr-2 h-4 w-4" />
          Emails Personalizados
        </button>
      </div>

      {/* Conteúdo da Aba de Descontos */}
      {activeTab === 'discounts' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuração de Descontos */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Criar Regra de Desconto Progressivo</CardTitle>
                <CardDescription>
                  Ofereça descontos maiores conforme o cliente adiciona mais itens ao carrinho
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="discount-name">Nome da Regra</Label>
                  <Input id="discount-name" placeholder="Ex: Black Friday - Desconto Progressivo" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="discount-type">Tipo de Desconto</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Percentual" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentual</SelectItem>
                        <SelectItem value="fixed">Valor Fixo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount-scope">Aplicar a</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Carrinho total" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cart">Carrinho total</SelectItem>
                        <SelectItem value="category">Categoria específica</SelectItem>
                        <SelectItem value="product">Produto específico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Faixas de Desconto</Label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2 items-center">
                      <Input placeholder="Quantidade mínima" />
                      <Input placeholder="Quantidade máxima" />
                      <Input placeholder="Desconto (%)" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 items-center">
                      <Input placeholder="2" />
                      <Input placeholder="5" />
                      <Input placeholder="10" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 items-center">
                      <Input placeholder="6" />
                      <Input placeholder="10" />
                      <Input placeholder="15" />
                    </div>
                    <Button variant="outline" className="gap-2">
                      <IconPlus className="h-4 w-4" />
                      Adicionar Faixa
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="discount-start">Data de Início</Label>
                    <Input id="discount-start" type="datetime-local" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount-end">Data de Término</Label>
                    <Input id="discount-end" type="datetime-local" />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="discount-active" />
                  <Label htmlFor="discount-active">Ativar regra imediatamente</Label>
                </div>

                <Button className="w-full mt-4">Salvar Regra de Desconto</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regras de Desconto Ativas</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Faixas</TableHead>
                      <TableHead>Período</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3].map((item) => (
                      <TableRow key={item}>
                        <TableCell className="font-medium">Desconto Progressivo {item}</TableCell>
                        <TableCell>{item === 1 ? 'Carrinho' : item === 2 ? 'Categoria' : 'Produto'}</TableCell>
                        <TableCell>{item} faixas</TableCell>
                        <TableCell>Até {item}/12/2023</TableCell>
                        <TableCell>
                          <Badge variant={item !== 3 ? 'default' : 'destructive'}>
                            {item !== 3 ? 'Ativo' : 'Inativo'}
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
              </CardContent>
            </Card>
          </div>

          {/* Visualização e Estatísticas */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pré-visualização</CardTitle>
                <CardDescription>
                  Como aparecerá para seus clientes
                </CardDescription>
              </CardHeader>
              <CardContent className="bg-muted/50 p-4 rounded-lg">
                <div className="border rounded-md p-4 bg-background">
                  <h3 className="font-medium">Desconto Progressivo Ativo!</h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span>2-5 itens:</span>
                      <span className="font-medium">10% OFF</span>
                    </div>
                    <div className="flex justify-between">
                      <span>6-10 itens:</span>
                      <span className="font-medium">15% OFF</span>
                    </div>
                    <div className="flex justify-between">
                      <span>11+ itens:</span>
                      <span className="font-medium">20% OFF</span>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-success/10 text-success text-sm rounded">
                    Adicione mais 3 itens para ganhar 15% de desconto!
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Regras ativas</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between">
                  <span>Desconto médio aplicado</span>
                  <span className="font-medium">12%</span>
                </div>
                <div className="flex justify-between">
                  <span>Aumento no ticket médio</span>
                  <span className="font-medium">+18%</span>
                </div>
                <div className="flex justify-between">
                  <span>Vendas influenciadas</span>
                  <span className="font-medium">124</span>
                </div>
                <Separator className="my-2" />
                <div className="text-sm text-muted-foreground">
                  Última atualização: hoje às 14:32
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba de Emails */}
      {activeTab === 'emails' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Templates e Criação */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Templates de Email</CardTitle>
                <CardDescription>
                  Gerencie seus modelos de email automatizados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full gap-2">
                  <IconPlus className="h-4 w-4" />
                  Novo Template
                </Button>

                <div className="space-y-2">
                  {emailTemplates.map((template) => (
                    <div 
                      key={template.id}
                      className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-muted-foreground">{template.trigger}</div>
                      <div className="mt-1">
                        <Badge variant={template.status === 'active' ? 'default' : 'destructive'}>
                          {template.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações de Email</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-enabled">Ativar emails automáticos</Label>
                  <Switch id="email-enabled" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sender-name">Nome do Remetente</Label>
                  <Input id="sender-name" defaultValue="Sua Loja" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sender-email">Email do Remetente</Label>
                  <Input id="sender-email" defaultValue="contato@sualoja.com" />
                </div>

                <Button className="w-full mt-2">Salvar Configurações</Button>
              </CardContent>
            </Card>
          </div>

          {/* Editor de Email */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Editor de Email</CardTitle>
                <CardDescription>
                  Personalize o template selecionado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-subject">Assunto</Label>
                  <Input 
                    id="email-subject" 
                    defaultValue="Você esqueceu itens no seu carrinho!" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-trigger">Disparar quando</Label>
                  <Select defaultValue="2h">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o gatilho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30m">30 minutos após abandono</SelectItem>
                      <SelectItem value="1h">1 hora após abandono</SelectItem>
                      <SelectItem value="2h">2 horas após abandono</SelectItem>
                      <SelectItem value="6h">6 horas após abandono</SelectItem>
                      <SelectItem value="24h">24 horas após abandono</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Conteúdo do Email</Label>
                  <div className="border rounded-md p-4 bg-muted/50 min-h-[300px]">
                    <div className="bg-white p-6 rounded shadow-sm">
                      <div className="text-center mb-4">
                        <h2 className="text-xl font-bold">Você esqueceu itens no seu carrinho!</h2>
                      </div>
                      
                      <div className="mb-4">
                        <p>Olá [Nome do Cliente],</p>
                        <p className="mt-2">
                          Notamos que você deixou itens no seu carrinho. Não perca esta oportunidade!
                        </p>
                      </div>

                      <div className="border rounded-md p-4 mb-4">
                        <h3 className="font-medium mb-2">Seu carrinho:</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Produto ABC</span>
                            <span>MZN 250.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Produto XYZ</span>
                            <span>MZN 180.00</span>
                          </div>
                          <Separator className="my-1" />
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>MZN 430.00</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <p className="text-yellow-700">
                          <strong>Oferta especial!</strong> Complete sua compra agora e ganhe 10% de desconto!
                        </p>
                      </div>

                      <div className="text-center">
                        <Button className="bg-primary hover:bg-primary/90 text-white">
                          Retornar ao Carrinho
                        </Button>
                      </div>

                      <div className="mt-6 pt-4 border-t text-sm text-muted-foreground">
                        <p>Caso não queira mais receber estes emails, <a href="#" className="text-primary">clique aqui</a>.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-discount">Oferecer desconto</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="10% OFF" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5% OFF</SelectItem>
                        <SelectItem value="10">10% OFF</SelectItem>
                        <SelectItem value="15">15% OFF</SelectItem>
                        <SelectItem value="none">Nenhum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-expiry">Validade do desconto</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="24 horas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6h">6 horas</SelectItem>
                        <SelectItem value="12h">12 horas</SelectItem>
                        <SelectItem value="24h">24 horas</SelectItem>
                        <SelectItem value="48h">48 horas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline">Visualizar</Button>
                  <Button>Salvar Template</Button>
                  <Button variant="secondary" className="ml-auto">
                    Testar Envio
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas de Envio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-2xl font-bold">78%</div>
                    <div className="text-sm text-muted-foreground">Taxa de Abertura</div>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-2xl font-bold">32%</div>
                    <div className="text-sm text-muted-foreground">Taxa de Cliques</div>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-2xl font-bold">18%</div>
                    <div className="text-sm text-muted-foreground">Taxa de Conversão</div>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-2xl font-bold">124</div>
                    <div className="text-sm text-muted-foreground">Vendas Geradas</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}