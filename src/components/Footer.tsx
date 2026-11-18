import { Lock, Unlock } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { PortalView } from '../types/portal';

interface FooterProps {
  onNavigate: (view: PortalView) => void;
  isOperatorMode: boolean;
  onOpenOperatorModal: () => void;
  onLogoutOperator: () => void;
}

export function Footer({
  onNavigate,
  isOperatorMode,
  onOpenOperatorModal,
  onLogoutOperator,
}: FooterProps) {
  return (
    <footer className="border-t border-[#E2DDD4] bg-[#F2EFE9] text-[#1C1917] mt-20 no-print">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#E2DDD4]">
          <div className="md:col-span-5 space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#1C1917]">
              {SCHOOL_INFO.namaResmi}
            </h2>
            <p className="text-sm text-[#57534E] leading-relaxed max-w-md">
              {SCHOOL_INFO.alamat}. Berdiri dari akar pengabdian pendidikan sejak tahun 1966 di lereng Gunung Wilis bagian barat daya.
            </p>
            <p className="font-mono-tabular text-xs text-[#57534E]">
              NPSN {SCHOOL_INFO.npsn} · Akreditasi {SCHOOL_INFO.akreditasi} · Status {SCHOOL_INFO.status}
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-[#1C1917]">Tautan Portal</h3>
            <ul className="space-y-2 text-sm text-[#57534E]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('beranda')}
                  className="hover:text-[#1E3A8A] transition-colors cursor-pointer"
                >
                  Beranda Sekolah
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('profil')}
                  className="hover:text-[#1E3A8A] transition-colors cursor-pointer"
                >
                  Sejarah & Direktori Guru
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('akademik')}
                  className="hover:text-[#1E3A8A] transition-colors cursor-pointer"
                >
                  Kurikulum & Ekstrakurikuler
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('berita')}
                  className="hover:text-[#1E3A8A] transition-colors cursor-pointer"
                >
                  Berita & Pengumuman
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('ppdb')}
                  className="hover:text-[#1E3A8A] transition-colors cursor-pointer"
                >
                  Pendaftaran PPDB Online
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="text-sm font-semibold text-[#1C1917]">Layanan Tata Usaha</h3>
            <dl className="space-y-2 text-sm text-[#57534E]">
              <div className="flex justify-between gap-4 border-b border-[#E2DDD4] pb-1.5">
                <dt>Jam Operasional</dt>
                <dd className="font-mono-tabular text-[#1C1917] text-right">{SCHOOL_INFO.jamLayanan}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#E2DDD4] pb-1.5">
                <dt>Telepon Kantor</dt>
                <dd className="font-mono-tabular text-[#1C1917] text-right">{SCHOOL_INFO.telepon}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#E2DDD4] pb-1.5">
                <dt>Pos-el Resmi</dt>
                <dd className="text-[#1C1917] text-right">{SCHOOL_INFO.email}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#57534E]">
          <p>
            © {new Date().getFullYear()} {SCHOOL_INFO.namaResmi}, Kabupaten Ponorogo. Seluruh hak cipta dilindungi.
          </p>

          <div className="flex items-center gap-4">
            {isOperatorMode ? (
              <button
                type="button"
                onClick={onLogoutOperator}
                className="inline-flex items-center gap-1.5 text-[#1E3A8A] font-medium hover:underline cursor-pointer"
              >
                <Unlock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Keluar Mode Operator</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenOperatorModal}
                className="inline-flex items-center gap-1.5 text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Masuk Operator Sekolah</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
