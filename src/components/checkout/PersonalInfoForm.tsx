// components/checkout/PersonalInfoForm.tsx
'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PersonalInfoFormProps = {
  fullName: string;
  phone: string;
  email: string;
  onFullNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
};

export const PersonalInfoForm = ({
  fullName,
  phone,
  email,
  onFullNameChange,
  onPhoneChange,
  onEmailChange,
}: PersonalInfoFormProps) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Informações de Envio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="fullName">Nome Completo</Label>
            <Input
              value={fullName}
              onChange={(e) => onFullNameChange(e.target.value)}
              placeholder="Nome Completo"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              placeholder="Telefone"
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Email"
          />
        </div>
      </CardContent>
    </Card>
  );
};