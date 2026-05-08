import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function handler() {
  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        },
        children: [
          // Top accent bar
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute', top: 0, left: 0, right: 0, height: '6px',
                background: 'linear-gradient(90deg, #1a56db, #3b82f6, #1a56db)',
              }
            }
          },
          // Company name
          {
            type: 'div',
            props: {
              style: { fontSize: '80px', fontWeight: '900', color: '#ffffff', letterSpacing: '4px', marginBottom: '8px' },
              children: 'CLITUS PC'
            }
          },
          {
            type: 'div',
            props: {
              style: { fontSize: '24px', color: '#64748b', letterSpacing: '2px', marginBottom: '28px' },
              children: 'Technology Company Limited'
            }
          },
          // Divider
          {
            type: 'div',
            props: { style: { width: '500px', height: '3px', background: '#1a56db', marginBottom: '28px', opacity: '0.7' } }
          },
          // Tagline
          {
            type: 'div',
            props: {
              style: { fontSize: '34px', fontWeight: '700', color: '#3b82f6', marginBottom: '14px' },
              children: 'Giải pháp công nghệ toàn diện'
            }
          },
          {
            type: 'div',
            props: {
              style: { fontSize: '22px', color: '#94a3b8', marginBottom: '40px' },
              children: 'Web · App · ERP · Cloud · AI · Hosting & Server'
            }
          },
          // Stats row
          {
            type: 'div',
            props: {
              style: { display: 'flex', gap: '16px' },
              children: [
                { type: 'div', props: { style: { background: 'rgba(26,86,219,0.2)', border: '1.5px solid #1a56db', borderRadius: '12px', padding: '12px 28px', textAlign: 'center' }, children: [{ type: 'div', props: { style: { fontSize: '28px', fontWeight: '800', color: '#3b82f6' }, children: '50+' } }, { type: 'div', props: { style: { fontSize: '13px', color: '#64748b' }, children: 'Dự án' } }] } },
                { type: 'div', props: { style: { background: 'rgba(26,86,219,0.2)', border: '1.5px solid #1a56db', borderRadius: '12px', padding: '12px 28px', textAlign: 'center' }, children: [{ type: 'div', props: { style: { fontSize: '28px', fontWeight: '800', color: '#3b82f6' }, children: '30+' } }, { type: 'div', props: { style: { fontSize: '13px', color: '#64748b' }, children: 'Khách hàng' } }] } },
                { type: 'div', props: { style: { background: 'rgba(26,86,219,0.2)', border: '1.5px solid #1a56db', borderRadius: '12px', padding: '12px 28px', textAlign: 'center' }, children: [{ type: 'div', props: { style: { fontSize: '28px', fontWeight: '800', color: '#3b82f6' }, children: '5+' } }, { type: 'div', props: { style: { fontSize: '13px', color: '#64748b' }, children: 'Năm KN' } }] } },
              ]
            }
          },
          // URL bottom
          {
            type: 'div',
            props: {
              style: { position: 'absolute', bottom: '28px', right: '80px', fontSize: '18px', color: '#475569' },
              children: 'clituspc-tech.vercel.app'
            }
          },
        ]
      }
    },
    { width: 1200, height: 630 }
  );
}
