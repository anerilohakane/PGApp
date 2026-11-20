import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonToast,
} from '@ionic/react';
import { downloadOutline, documentTextOutline, calendarOutline, sendOutline } from 'ionicons/icons';
import { reportService, rentService } from '../../services';

const AdminReports: React.FC = () => {
  const [billingMonth, setBillingMonth] = useState('2026-11');
  const [genMonth, setGenMonth] = useState('2026-12');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const downloadRentExcel = () => {
    const url = reportService.getExcelDownloadUrl('rent', billingMonth);
    window.open(url, '_blank');
  };

  const downloadCollectionExcel = () => {
    const url = reportService.getExcelDownloadUrl('collection');
    window.open(url, '_blank');
  };

  const triggerGenerateRent = async () => {
    try {
      const res = await rentService.generateRent(genMonth);
      setToastMessage(`Batch rent generated! Records created: ${res.generatedRecords?.length ?? 0}`);
    } catch (err: any) {
      setToastMessage(err.response?.data?.error || 'Failed to generate rent');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Reports & Batches</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': '#f8fafc' }}>
        {/* Export Reports Card */}
        <IonCard style={{ margin: '0 0 16px 0', border: '1px solid #e2e8f0' }}>
          <IonCardContent style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0', color: '#0f172a' }}>
              Export Financial Reports
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
              Download complete structured Excel spreadsheets for audit and accounting.
            </p>

            <IonItem lines="inset" style={{ '--padding-start': '0', marginBottom: '16px' }}>
              <IonLabel position="stacked" style={{ fontWeight: '600' }}>Filter Month for Rent Report</IonLabel>
              <IonInput
                type="month"
                value={billingMonth}
                onIonChange={(e) => setBillingMonth(e.detail.value!)}
              />
            </IonItem>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <IonButton expand="block" color="primary" onClick={downloadRentExcel}>
                <IonIcon icon={downloadOutline} slot="start" />
                Download Monthly Rent Report (.xlsx)
              </IonButton>

              <IonButton expand="block" color="secondary" onClick={downloadCollectionExcel}>
                <IonIcon icon={downloadOutline} slot="start" />
                Download Payment Receipts Ledger (.xlsx)
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Batch Rent Generation */}
        <IonCard style={{ margin: '0 0 16px 0', border: '1px solid #e2e8f0' }}>
          <IonCardContent style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0', color: '#0f172a' }}>
              Generate Monthly Rent Records
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
              Creates billing records for all currently active residents for the chosen cycle. Automatically carries forward past unpaid balances. Duplicate prevention enforced.
            </p>

            <IonItem lines="inset" style={{ '--padding-start': '0', marginBottom: '16px' }}>
              <IonLabel position="stacked" style={{ fontWeight: '600' }}>Billing Cycle Month</IonLabel>
              <IonInput
                type="month"
                value={genMonth}
                onIonChange={(e) => setGenMonth(e.detail.value!)}
              />
            </IonItem>

            <IonButton expand="block" color="warning" onClick={triggerGenerateRent}>
              <IonIcon icon={sendOutline} slot="start" />
              Generate Rent for {genMonth}
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage || ''}
          duration={3000}
          onDidDismiss={() => setToastMessage(null)}
          color="dark"
        />
      </IonContent>
    </IonPage>
  );
};

export default AdminReports;

