import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonLoading,
  IonToast,
} from '@ionic/react';
import { lockClosedOutline, mailOutline, businessOutline, eyeOutline, eyeOffOutline, sparklesOutline } from 'ionicons/icons';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { login } = useAuth();
  const history = useHistory();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setToastMessage('Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.login(email, password);
      login(res.token, res.user);
      if (res.user.role === 'admin') {
        history.replace('/admin/dashboard');
      } else {
        history.replace('/resident/dashboard');
      }
    } catch (err: any) {
      setToastMessage(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const quickFill = (role: 'admin' | 'resident') => {
    if (role === 'admin') {
      setEmail('admin@pgapp.com');
      setPassword('Admin@123');
    } else {
      setEmail('lohakaneaneri6@gmail.com');
      setPassword('Resident@123');
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding" style={{ '--background': 'radial-gradient(circle at top left, #e0e7ff 0%, #f8fafc 40%, #f1f5f9 100%)' }}>
        <div style={{ maxWidth: '440px', margin: '40px auto 20px auto' }}>
          
          {/* Header Branding */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 28px -4px rgba(79, 70, 229, 0.4)',
                transform: 'rotate(-2deg)',
              }}
            >
              <IonIcon icon={businessOutline} style={{ fontSize: '40px', color: '#fff', transform: 'rotate(2deg)' }} />
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '18px 0 6px 0', letterSpacing: '-0.03em' }}>
              PG Manager Pro
            </h1>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0, fontWeight: 500 }}>
              Smart property management & resident ecosystem
            </p>
          </div>

          <IonCard
            style={{
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 20px 35px -10px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(0,0,0,0.02)',
              margin: '0',
            }}
          >
            <IonCardContent style={{ padding: '28px' }}>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0, color: '#0f172a' }}>Sign In</h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>Access your administrative or resident dashboard</p>
              </div>

              <form onSubmit={handleLogin}>
                <IonItem
                  lines="none"
                  style={{
                    '--padding-start': '14px',
                    '--background': '#f8fafc',
                    borderRadius: '14px',
                    border: '1px solid #e2e8f0',
                    marginBottom: '14px',
                  }}
                >
                  <IonIcon icon={mailOutline} slot="start" style={{ color: '#4f46e5', fontSize: '20px' }} />
                  <IonInput
                    type="email"
                    value={email}
                    placeholder="name@example.com"
                    onIonChange={(e) => setEmail(e.detail.value!)}
                    required
                    style={{ fontSize: '14px', fontWeight: '500' }}
                  />
                </IonItem>

                <IonItem
                  lines="none"
                  style={{
                    '--padding-start': '14px',
                    '--background': '#f8fafc',
                    borderRadius: '14px',
                    border: '1px solid #e2e8f0',
                    marginBottom: '20px',
                    position: 'relative',
                  }}
                >
                  <IonIcon icon={lockClosedOutline} slot="start" style={{ color: '#4f46e5', fontSize: '20px' }} />
                  <IonInput
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder="Enter password"
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    required
                    style={{ fontSize: '14px', fontWeight: '500' }}
                  />
                  <IonButton
                    fill="clear"
                    slot="end"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ margin: 0, '--padding-start': '4px', '--padding-end': '4px' }}
                  >
                    <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} slot="icon-only" style={{ color: '#64748b' }} />
                  </IonButton>
                </IonItem>

                <IonButton
                  expand="block"
                  type="submit"
                  style={{
                    height: '50px',
                    '--background': 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                    '--box-shadow': '0 8px 20px -3px rgba(79, 70, 229, 0.4)',
                    fontSize: '15px',
                  }}
                >
                  Sign In to Account
                </IonButton>
              </form>

              {/* 1-Click Fast Fill */}
              <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px dashed #e2e8f0', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                  Quick Fill Demo Credentials
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <IonButton
                    size="small"
                    fill="outline"
                    color="primary"
                    onClick={() => quickFill('admin')}
                    style={{ flex: 1, height: '36px', '--border-radius': '10px' }}
                  >
                    👑 Admin Fill
                  </IonButton>
                  <IonButton
                    size="small"
                    fill="outline"
                    color="secondary"
                    onClick={() => quickFill('resident')}
                    style={{ flex: 1, height: '36px', '--border-radius': '10px' }}
                  >
                    🧑 Tenant Fill
                  </IonButton>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        <IonLoading isOpen={loading} message="Authenticating..." spinner="crescent" />
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

export default Login;
