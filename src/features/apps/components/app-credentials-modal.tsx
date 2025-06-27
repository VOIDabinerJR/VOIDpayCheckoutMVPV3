'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IconCopy, IconKey, IconRefresh, IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface AppCredentialsModalProps {
  app?: {
    id: string;
    name: string;
    client_id: string;
    client_secret?: string;
    created_at: string;
  };
  children?: React.ReactNode;
  onRotateCredentials?: (appId: string) => Promise<void>;
}

export default function AppCredentialsModal({
  app,
  children,
  onRotateCredentials
}: AppCredentialsModalProps) {
  const [open, setOpen] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [copied, setCopied] = useState({
    client_id: false,
    client_secret: false
  });

  const handleCopy = (text: string, field: 'client_id' | 'client_secret') => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [field]: true }));
    toast.success(
      `${field === 'client_id' ? 'Client ID' : 'Client Secret'} copiado para a área de transferência`
    );
    setTimeout(() => setCopied((prev) => ({ ...prev, [field]: false })), 2000);
  };

  const handleRotate = async () => {
    if (!app?.id || !onRotateCredentials) return;

    try {
      setIsRotating(true);
      await onRotateCredentials(app.id);
      toast.success('Credenciais renovadas com sucesso');
      setShowSecret(false); // Oculta o segredo após renovação
    } catch (error) {
      toast.error('Falha ao renovar credenciais');
    } finally {
      setIsRotating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant='outline'>
            <IconKey className='mr-2 h-4 w-4' />
            Ver Credenciais
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center gap-2'>
              <IconKey className='h-5 w-5' />
              Credenciais do {app?.name || 'App'}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          {/* Client ID */}
          <div className='space-y-2'>
            <Label htmlFor='client-id'>Client ID</Label>
            <div className='flex gap-2'>
              <Input
                id='client-id'
                value={app?.client_id || ''}
                readOnly
                className='font-mono'
              />
              <Button
                size='icon'
                variant='outline'
                onClick={() =>
                  app?.client_id && handleCopy(app.client_id, 'client_id')
                }
              >
                {copied.client_id ? (
                  <IconCheck className='h-4 w-4' />
                ) : (
                  <IconCopy className='h-4 w-4' />
                )}
              </Button>
            </div>
          </div>

          {/* Client Secret */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='client-secret'>Client Secret</Label>
              <Button
                variant='link'
                size='sm'
                className='h-auto p-0 text-xs'
                onClick={() => setShowSecret(!showSecret)}
              >
                {showSecret ? 'Ocultar' : 'Mostrar'} Segredo
              </Button>
            </div>
            <div className='flex gap-2'>
              <Input
                id='client-secret'
                type={showSecret ? 'text' : 'password'}
                value={
                  showSecret
                    ? app?.client_secret || 'Não disponível'
                    : '••••••••••••••••'
                }
                readOnly
                className='font-mono'
              />
              <Button
                size='icon'
                variant='outline'
                disabled={!app?.client_secret || !showSecret}
                onClick={() =>
                  app?.client_secret &&
                  handleCopy(app.client_secret, 'client_secret')
                }
              >
                {copied.client_secret ? (
                  <IconCheck className='h-4 w-4' />
                ) : (
                  <IconCopy className='h-4 w-4' />
                )}
              </Button>
            </div>
            {app?.client_secret && (
              <p className='text-muted-foreground text-xs'>
                Criado em: {new Date(app.created_at).toLocaleString()}
              </p>
            )}
          </div>

          {/* Aviso de Segurança */}
          <div className='rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200'>
            <p className='font-medium'>Aviso de Segurança</p>
            <ul className='mt-1 list-inside list-disc space-y-1'>
              <li>Mantenha suas credenciais confidenciais</li>
              <li>Nunca compartilhe seu Client Secret em código client-side</li>
              <li>Renove as credenciais imediatamente se comprometidas</li>
            </ul>
          </div>

          {/* Ações */}
          <div className='flex justify-end gap-2 pt-2'>
            <Button
              variant='destructive'
              onClick={handleRotate}
              disabled={isRotating || !onRotateCredentials}
            >
              <IconRefresh className='mr-2 h-4 w-4' />
              {isRotating ? 'Renovando...' : 'Renovar Credenciais'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}