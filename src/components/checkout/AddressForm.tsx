// components/checkout/AddressForm.tsx
'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type AddressFormProps = {
  address: string;
  city: string;
  postalCode: string;
  onAddressChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onPostalCodeChange: (value: string) => void;
};

export const AddressForm = ({
  address,
  city,
  postalCode,
  onAddressChange,
  onCityChange,
  onPostalCodeChange,
}: AddressFormProps) => {
  return (
    <Card  className="glass-card">
      <CardHeader>
        <CardTitle  className="text-strong-transparent">Endereço de Envio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Label htmlFor="address" className="text-muted-transparent">Endereço</Label>
        <Input
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder="Bairro, Distrito, Província"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            placeholder="Cidade"
          />
          <Input
            value={postalCode}
            onChange={(e) => onPostalCodeChange(e.target.value)}
            placeholder="Código Postal"
          />
        </div>
      </CardContent>
    </Card>
  );
};