'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DiscountsAndEmailsSection } from './discounts-emails';
import { PixelsTrackingSection } from './pixels';
import { SeasonalPromotionsSection } from './promotions';
import { UpsellCrossSellSection } from './upsell';
import { GiftsBonusSection } from './gifts';

export default function MarketingTabs() {
  return (
    <Tabs defaultValue="discounts" className="w-full">
      <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-muted/50">
        <TabsTrigger value="discounts">Descontos & Emails</TabsTrigger>
        <TabsTrigger value="pixels">Pixels</TabsTrigger>
        <TabsTrigger value="promotions">Promoções</TabsTrigger>
        <TabsTrigger value="upsell">Upsell</TabsTrigger>
        <TabsTrigger value="gifts">Brindes</TabsTrigger>
      </TabsList>

      <TabsContent value="discounts">
        <DiscountsAndEmailsSection />
      </TabsContent>
      <TabsContent value="pixels">
        <PixelsTrackingSection />
      </TabsContent>
      <TabsContent value="promotions">
        <SeasonalPromotionsSection />
      </TabsContent>
      <TabsContent value="upsell">
        <UpsellCrossSellSection />
      </TabsContent>
      <TabsContent value="gifts">
        <GiftsBonusSection />
      </TabsContent>
    </Tabs>
  );
}