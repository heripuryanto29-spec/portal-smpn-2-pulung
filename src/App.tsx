import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Share2, X } from 'lucide-react';
import { AcademicView } from './components/AcademicView';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { Navbar } from './components/Navbar';
import { NewsView } from './components/NewsView';
import { PortalImage } from './components/PortalImage';
import { PpdbView } from './components/PpdbView';
import { ProfileView } from './components/ProfileView';
import { INITIAL_NEWS, INITIAL_PPDB_SUBMISSIONS } from './data/schoolData';
import { NewsArticle, PortalView, PpdbStatus, PpdbSubmission } from './types/portal';

const STORAGE_NEWS_KEY = 'smpn2pulung_custom_news_v1';
const STORAGE_PPDB_KEY = 'smpn2pulung_ppdb_submissions_v1';
const OPERATOR_ACCESS_CODE = 'PULUNG2026';

export default function App() {
  const [activeView, setActiveView] = useState<PortalView>(() => {
    const hash = window.location.hash.replace('#', '') as PortalView;
    const valid: PortalView[] = ['beranda', 'profil', 'akademik', 'berita', 'ppdb'];
    return valid.includes(hash) ? hash : 'beranda';
  });

  const [newsList, setNewsList] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_NEWS_KEY);
      if (saved) {
        const customPosts = JSON.parse(saved) as NewsArticle[];
        return [...customPosts, ...INITIAL_NEWS];
      }
    } catch {
      // Ignore storage error
    }
    return INITIAL_NEWS;
  });

  const [ppdbList, setPpdbList] = useState<PpdbSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PPDB_KEY);
      if (saved) {
        return JSON.parse(saved) as PpdbSubmission[];
      }
    } catch {
      // Ignore storage error
    }
    return INITIAL_PPDB_SUBMISSIONS;
  });

  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isOperatorMode, setIsOperatorMode] = useState(false);
  const [showOperatorModal, setShowOperatorModal] = useState(false);
  const [operatorCode, setOperatorCode] = useState('');
  const [operatorError, setOperatorError] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PortalView;
      const valid: PortalView[] = ['beranda', 'profil', 'akademik', 'berita', 'ppdb'];
      if (valid.includes(hash)) {
        setActiveView(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: PortalView) => {
    setActiveView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddArticle = (
    draft: Omit<NewsArticle, 'id' | 'tanggal' | 'waktuBaca'>
  ) => {
    const today = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());

    const wordCount = draft.isi.join(' ').split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 180));

    const newArticle: NewsArticle = {
      ...draft,
      id: `custom-${Date.now()}`,
      tanggal: today,
      waktuBaca: `${minutes} menit baca`,
      kustom: true,
    };

    const nextNews = [newArticle, ...newsList];
    setNewsList(nextNews);

    try {
      const customOnly = nextNews.filter((item) => item.kustom);
      localStorage.setItem(STORAGE_NEWS_KEY, JSON.stringify(customOnly));
    } catch {
      // Ignore storage error
    }

    showToast('Pengumuman baru berhasil diterbitkan.');
  };

  const handleDeleteArticle = (id: string) => {
    const nextNews = newsList.filter((item) => item.id !== id);
    setNewsList(nextNews);
    try {
      const customOnly = nextNews.filter((item) => item.kustom);
      localStorage.setItem(STORAGE_NEWS_KEY, JSON.stringify(customOnly));
    } catch {
      // Ignore storage error
    }
    if (selectedArticle?.id === id) {
      setSelectedArticle(null);
    }
    showToast('Berita kustom berhasil dihapus.');
  };

  const handleAddPpdb = (
    data: Omit<PpdbSubmission, 'noRegistrasi' | 'tanggalDaftar' | 'statusVerifikasi'>
  ): PpdbSubmission => {
    const seq = String(ppdbList.length + 1).padStart(4, '0');
    const today = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());

    const created: PpdbSubmission = {
      ...data,
      noRegistrasi: `PPDB-2026-${seq}`,
      tanggalDaftar: today,
      statusVerifikasi: 'Menunggu Verifikasi',
      catatanPanitia: 'Menunggu verifikasi berkas fisik di Posko Tata Usaha Desa Kesugihan.',
    };

    const nextList = [created, ...ppdbList];
    setPpdbList(nextList);

    try {
      localStorage.setItem(STORAGE_PPDB_KEY, JSON.stringify(nextList));
    } catch {
      // Ignore storage error
    }

    showToast(`Pendaftaran berhasil. Nomor registrasi Anda: ${created.noRegistrasi}`);
    return created;
  };

  const handleUpdatePpdbStatus = (
    noRegistrasi: string,
    status: PpdbStatus,
    catatan: string
  ) => {
    const nextList = ppdbList.map((item) =>
      item.noRegistrasi === noRegistrasi
        ? { ...item, statusVerifikasi: status, catatanPanitia: catatan }
        : item
    );
    setPpdbList(nextList);
    try {
      localStorage.setItem(STORAGE_PPDB_KEY, JSON.stringify(nextList));
    } catch {
      // Ignore storage error
    }
    showToast(`Status ${noRegistrasi} diperbarui menjadi ${status}.`);
  };

  const handleOperatorLogin = (e: FormEvent) => {
    e.preventDefault();
    if (operatorCode.trim().toUpperCase() === OPERATOR_ACCESS_CODE) {
      setIsOperatorMode(true);
      setShowOperatorModal(false);
      setOperatorCode('');
      setOperatorError('');
      showToast('Mode Operator Sekolah aktif.');
    } else {
      setOperatorError('Kode akses tidak sesuai. Gunakan kode uji coba PULUNG2026.');
    }
  };

  const handleCopyArticleLink = async (article: NewsArticle) => {
    const shareText = `${article.judul} — SMP Negeri 2 Pulung`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareText} (${window.location.href})`);
        showToast('Tautan berita disalin ke papan klip.');
      }
    } catch {
      showToast('Judul berita siap dibagikan.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <Navbar activeView={activeView} onNavigate={handleNavigate} />

      <main className="flex-1">
        {activeView === 'beranda' && (
          <HomeView
            news={newsList}
            onNavigate={handleNavigate}
            onSelectArticle={(article) => setSelectedArticle(article)}
          />
        )}
        {activeView === 'profil' && <ProfileView />}
        {activeView === 'akademik' && <AcademicView />}
        {activeView === 'berita' && (
          <NewsView
            news={newsList}
            isOperatorMode={isOperatorMode}
            onSelectArticle={(article) => setSelectedArticle(article)}
            onAddArticle={handleAddArticle}
            onDeleteArticle={handleDeleteArticle}
            onOpenOperatorModal={() => setShowOperatorModal(true)}
          />
        )}
        {activeView === 'ppdb' && (
          <PpdbView
            submissions={ppdbList}
            isOperatorMode={isOperatorMode}
            onAddSubmission={handleAddPpdb}
            onUpdateStatus={handleUpdatePpdbStatus}
          />
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        isOperatorMode={isOperatorMode}
        onOpenOperatorModal={() => setShowOperatorModal(true)}
        onLogoutOperator={() => {
          setIsOperatorMode(false);
          showToast('Keluar dari Mode Operator Sekolah.');
        }}
      />

      {/* Modal Baca Artikel */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedArticle.judul}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedArticle(null)}
        >
          <article
            className="bg-[#FBF9F5] border border-[#E2DDD4] rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-[#E2DDD4] px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
                <span className="font-semibold text-[#1E3A8A]">
                  {selectedArticle.kategori}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">{selectedArticle.tanggal}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.waktuBaca}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                aria-label="Tutup artikel"
                className="w-10 h-10 inline-flex items-center justify-center rounded-md hover:bg-[#F2EFE9] text-[#1C1917] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1C1917] leading-snug">
                {selectedArticle.judul}
              </h2>

              <p className="text-xs text-[#57534E]">
                Ditulis oleh <strong className="text-[#1C1917]">{selectedArticle.penulis}</strong>
              </p>

              {selectedArticle.gambarUrl && (
                <figure>
                  <div className="aspect-[16/9] rounded-lg overflow-hidden border border-[#E2DDD4]">
                    <PortalImage
                      src={selectedArticle.gambarUrl}
                      alt={selectedArticle.judul}
                      containerClassName="w-full h-full"
                    />
                  </div>
                  {selectedArticle.keteranganGambar && (
                    <figcaption className="text-xs font-display italic text-[#57534E] mt-2">
                      {selectedArticle.keteranganGambar}
                    </figcaption>
                  )}
                </figure>
              )}

              <div className="space-y-4 text-base text-[#1C1917]/90 leading-[1.8] max-w-prose">
                {selectedArticle.isi.map((paragraf, index) => (
                  <p key={index}>{paragraf}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-[#E2DDD4] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleCopyArticleLink(selectedArticle)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#1C1917] bg-white border border-[#E2DDD4] hover:border-[#1E3A8A] rounded-md cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Salin Tautan Artikel</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#172E6E] rounded-md cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* Modal Masuk Mode Operator */}
      {showOperatorModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Masuk Mode Operator Sekolah"
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setShowOperatorModal(false)}
        >
          <div
            className="bg-[#FBF9F5] border border-[#E2DDD4] rounded-lg max-w-md w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E2DDD4] pb-3">
              <h2 className="font-display text-xl font-semibold text-[#1C1917]">
                Masuk Operator Sekolah
              </h2>
              <button
                type="button"
                onClick={() => setShowOperatorModal(false)}
                aria-label="Tutup dialog"
                className="w-9 h-9 inline-flex items-center justify-center rounded-md hover:bg-[#F2EFE9] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#57534E] leading-relaxed">
              Mode Operator memungkinkan penerbitan pengumuman baru serta verifikasi data pendaftar PPDB. Untuk pengujian portal ini, masukkan kode akses{' '}
              <span className="font-mono-tabular font-semibold text-[#1E3A8A]">PULUNG2026</span>.
            </p>

            <form onSubmit={handleOperatorLogin} className="space-y-4">
              {operatorError && (
                <p role="alert" className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  {operatorError}
                </p>
              )}

              <div className="space-y-1.5">
                <label htmlFor="operator-code" className="block text-xs font-semibold text-[#1C1917]">
                  Kode Akses Operator
                </label>
                <input
                  id="operator-code"
                  type="password"
                  value={operatorCode}
                  onChange={(e) => setOperatorCode(e.target.value)}
                  placeholder="Masukkan PULUNG2026"
                  className="w-full px-3.5 py-2.5 text-sm font-mono-tabular bg-white border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowOperatorModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#57534E] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#172E6E] rounded-md cursor-pointer"
                >
                  Aktifkan Mode Operator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-[#1C1917] text-white text-xs font-medium px-4 py-3 rounded-md shadow-lg flex items-center gap-2.5 max-w-sm no-print"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
