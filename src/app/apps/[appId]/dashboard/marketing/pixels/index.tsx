'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  IconDeviceAnalytics,
  IconPlus,
  IconTrash,
  IconEdit
} from '@tabler/icons-react';

export function PixelsTrackingSection() {
  const pixels = [
    {
      id: 1,
      platform: 'Facebook',
      pixelId: '123456789012345',
      status: 'active',
      lastActivity: 'Hoje, 14:32'
    },
    {
      id: 2,
      platform: 'Google Ads',
      pixelId: 'G-ABCDE12345',
      status: 'active',
      lastActivity: 'Ontem, 09:15'
    },
    {
      id: 3,
      platform: 'TikTok',
      pixelId: 'TTABCD123456789',
      status: 'inactive',
      lastActivity: 'Sem atividade'
    }
  ];

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Pixels de Rastreamento</CardTitle>
          <CardDescription>
            Configure pixels para acompanhar conversões e otimizar suas
            campanhas
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='pixel-platform'>Plataforma</Label>
                <Input
                  id='pixel-platform'
                  placeholder='Ex: Facebook, Google Ads, TikTok'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='pixel-id'>ID do Pixel</Label>
                <Input id='pixel-id' placeholder='Cole o ID do pixel aqui' />
              </div>
              <div className='flex items-center space-x-2'>
                <Switch id='pixel-active' />
                <Label htmlFor='pixel-active'>Ativar pixel</Label>
              </div>
              <Button className='gap-2'>
                <IconPlus className='h-4 w-4' />
                Adicionar Pixel
              </Button>
            </div>

            <div className='bg-muted/50 rounded-lg border p-4'>
              <h3 className='mb-2 font-medium'>Como encontrar seu Pixel ID:</h3>
              <ol className='text-muted-foreground list-inside list-decimal space-y-1 text-sm'>
                <li>Acesse o Business Manager do Facebook ou Google Ads</li>
                <li>
                  Navegue até a seção &quot;Pixels&quot; ou &quot;Tags&quot;
                </li>
                <li>
                  Copie o ID do pixel (geralmente começa com &quot;FB&quot; ou
                  &quot;G-&quot;)
                </li>
                <li>Cole no campo ao lado e ative o rastreamento</li>
              </ol>
            </div>
          </div>

          <div className='space-y-4'>
            <h3 className='font-medium'>Pixels Configurados</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plataforma</TableHead>
                  <TableHead>Pixel ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Última Atividade</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pixels.map((pixel) => (
                  <TableRow key={pixel.id}>
                    <TableCell className='font-medium'>
                      {pixel.platform}
                    </TableCell>
                    <TableCell>{pixel.pixelId}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          pixel.status === 'active' ? 'default' : 'destructive'
                        }
                      >
                        {pixel.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell>{pixel.lastActivity}</TableCell>
                    <TableCell>
                      <div className='flex gap-2'>
                        <Button variant='ghost' size='sm'>
                          <IconEdit className='h-4 w-4' />
                        </Button>
                        <Button variant='ghost' size='sm'>
                          <IconTrash className='h-4 w-4' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <Card>
              <CardHeader className='p-4'>
                <CardTitle className='text-sm font-medium'>
                  Eventos Rastreados
                </CardTitle>
              </CardHeader>
              <CardContent className='p-4 pt-0'>
                <div className='text-2xl font-bold'>14</div>
                <p className='text-muted-foreground text-xs'>últimos 7 dias</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='p-4'>
                <CardTitle className='text-sm font-medium'>
                  Conversões
                </CardTitle>
              </CardHeader>
              <CardContent className='p-4 pt-0'>
                <div className='text-2xl font-bold'>32</div>
                <p className='text-muted-foreground text-xs'>últimos 7 dias</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='p-4'>
                <CardTitle className='text-sm font-medium'>
                  Taxa de Conversão
                </CardTitle>
              </CardHeader>
              <CardContent className='p-4 pt-0'>
                <div className='text-2xl font-bold'>18%</div>
                <p className='text-muted-foreground text-xs'>
                  +2% em relação à semana anterior
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
