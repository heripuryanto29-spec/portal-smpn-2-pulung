import { useMemo, useState, type FormEvent } from 'react';
import { Plus, Search, Trash2 } from 'lucide-react';
import { NewsArticle, NewsCategory } from '../types/portal';
import { PortalImage } from './PortalImage';

interface NewsViewProps {
  news: NewsArticle[];
  isOperatorMode: boolean;
  onSelectArticle: (article: NewsArticle) => void;
  onAddArticle: (article: Omit<NewsArticle, 'id' | 'tanggal' | 'waktuBaca'>) => void;
  onDeleteArticle: (id: string) => void;
  onOpenOperatorModal: () => void;
}

const NEWS_CATEGORIES: NewsCategory[] = ['Semua', 'Pengumuman', 'Prestasi', 'Kegiatan', 'PPDB'];

export function NewsView({
  news,
  isOperatorMode,
  onSelectArticle,
  onAddArticle,
  onDeleteArticle,
  onOpenOperatorModal,
}: NewsViewProps) {
  const [selectedCat, setSelectedCat] = useState<NewsCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPublishForm, setShowPublishForm] = useState(false);

  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState<Exclude<NewsCategory, 'Semua'>>('Pengumuman');
  const [penulis, setPenulis] = useState('Humas SMPN 2 Pulung');
  const [ringkasan, setRingkasan] = useState('');
  const [isiNaskah, setIsiNaskah] = useState('');
  const [formError, setFormError] = useState('');

  const filteredNews = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return news.filter((item) => {
      const matchCat = selectedCat === 'Semua' || item.kategori === selectedCat;
      const matchQuery =
        !q ||
        item.judul.toLowerCase().includes(q) ||
        item.ringkasan.toLowerCase().includes(q) ||
        item.penulis.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [news, selectedCat, searchQuery]);

  const leadItem = filteredNews[0];
  const secondaryItems = filteredNews.slice(1, 4);
  const archiveItems = filteredNews.slice(4);

  const handlePublish = (e: FormEvent) => {
    e.preventDefault();
    if (!judul.trim() || !ringkasan.trim() || !isiNaskah.trim()) {
      setFormError('Judul, ringkasan, dan isi naskah berita wajib diisi.');
      return;
    }

    const paragraphs = isiNaskah
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    onAddArticle({
      judul: judul.trim(),
      kategori,
      penulis: penulis.trim() || 'Operator Sekolah',
      ringkasan: ringkasan.trim(),
      isi: paragraphs.length > 0 ? paragraphs : [ringkasan.trim()],
      kustom: true,
    });

    setJudul('');
    setRingkasan('');
    setIsiNaskah('');
    setFormError('');
    setShowPublishForm(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header & Operator Trigger */}
      <section className="border-b border-[#E2DDD4] pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-medium text-[#B45309] mb-2">Warta & Informasi Resmi</p>
          <h1
            className="font-display font-bold text-[#1C1917] leading-tight mb-3"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
          >
            Berita & Pengumuman Sekolah
          </h1>
          <p className="text-base text-[#57534E] max-w-2xl leading-relaxed">
            Publikasi kegiatan belajar, prestasi siswa SMP Negeri 2 Pulung, serta edaran resmi akademik untuk orang tua dan peserta didik.
          </p>
        </div>

        <div className="shrink-0">
          {isOperatorMode ? (
            <button
              type="button"
              onClick={() => setShowPublishForm((prev) => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#172E6E] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>{showPublishForm ? 'Tutup Form Terbit' : 'Terbitkan Pengumuman'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenOperatorModal}
              className="px-4 py-2.5 text-xs font-semibold text-[#1C1917] bg-white border border-[#E2DDD4] hover:border-[#1E3A8A] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Kelola Berita (Operator)
            </button>
          )}
        </div>
      </section>

      {/* Panel Terbit Operator */}
      {isOperatorMode && showPublishForm && (
        <section className="bg-white border border-[#1E3A8A]/40 rounded-lg p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#E2DDD4] pb-3">
            <h2 className="font-display text-xl font-semibold text-[#1C1917]">
              Terbitkan Berita / Pengumuman Baru
            </h2>
            <span className="text-xs font-medium text-[#1E3A8A]">Mode Operator Aktif</span>
          </div>

          <form onSubmit={handlePublish} className="space-y-4">
            {formError && (
              <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-2.5">
                {formError}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6 space-y-1.5">
                <label htmlFor="news-judul" className="block text-xs font-semibold text-[#1C1917]">
                  Judul Berita atau Pengumuman
                </label>
                <input
                  id="news-judul"
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Contoh: Jadwal Pengambilan Seragam Baru Kelas VII"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div className="md:col-span-3 space-y-1.5">
                <label htmlFor="news-kategori" className="block text-xs font-semibold text-[#1C1917]">
                  Kategori
                </label>
                <select
                  id="news-kategori"
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value as Exclude<NewsCategory, 'Semua'>)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                >
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Prestasi">Prestasi</option>
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="PPDB">PPDB</option>
                </select>
              </div>

              <div className="md:col-span-3 space-y-1.5">
                <label htmlFor="news-penulis" className="block text-xs font-semibold text-[#1C1917]">
                  Unit Penulis
                </label>
                <input
                  id="news-penulis"
                  type="text"
                  value={penulis}
                  onChange={(e) => setPenulis(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="news-ringkasan" className="block text-xs font-semibold text-[#1C1917]">
                Ringkasan Singkat
              </label>
              <input
                id="news-ringkasan"
                type="text"
                value={ringkasan}
                onChange={(e) => setRingkasan(e.target.value)}
                placeholder="1–2 kalimat ringkasan yang muncul pada daftar berita"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="news-isi" className="block text-xs font-semibold text-[#1C1917]">
                Isi Naskah Lengkap
              </label>
              <textarea
                id="news-isi"
                rows={4}
                value={isiNaskah}
                onChange={(e) => setIsiNaskah(e.target.value)}
                placeholder="Tuliskan isi berita atau pengumuman lengkap. Gunakan Enter untuk memisahkan paragraf."
                className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPublishForm(false)}
                className="px-4 py-2 text-xs font-medium text-[#57534E] hover:text-[#1C1917] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#172E6E] rounded-md transition-colors cursor-pointer"
              >
                Simpan & Publikasikan
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Filter Bar & Pencarian */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Kategori Berita"
          className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F2EFE9] border border-[#E2DDD4] rounded-lg"
        >
          {NEWS_CATEGORIES.map((cat) => {
            const active = selectedCat === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-white text-[#1E3A8A] font-semibold shadow-sm'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72">
          <Search
            className="w-4 h-4 text-[#57534E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul pengumuman..."
            aria-label="Cari berita dan pengumuman"
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
          />
        </div>
      </section>

      {filteredNews.length === 0 ? (
        <div className="py-14 text-center bg-white border border-[#E2DDD4] rounded-lg space-y-3">
          <p className="text-base font-semibold text-[#1C1917]">
            Belum ada berita yang sesuai dengan pencarian
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCat('Semua');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#172E6E] rounded-md cursor-pointer"
          >
            Tampilkan Semua Berita
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Tier 1: Lead Story */}
          {leadItem && (
            <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-[#E2DDD4] items-center">
              {leadItem.gambarUrl && (
                <button
                  type="button"
                  onClick={() => onSelectArticle(leadItem)}
                  className="lg:col-span-7 aspect-[16/10] rounded-lg overflow-hidden border border-[#E2DDD4] cursor-pointer group"
                >
                  <PortalImage
                    src={leadItem.gambarUrl}
                    alt={leadItem.judul}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </button>
              )}

              <div className={`${leadItem.gambarUrl ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-4`}>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
                  <span className="font-semibold text-[#1E3A8A]">{leadItem.kategori}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{leadItem.tanggal}</span>
                  <span aria-hidden="true">·</span>
                  <span>{leadItem.waktuBaca}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectArticle(leadItem)}
                  className="text-left group cursor-pointer"
                >
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917] group-hover:text-[#1E3A8A] transition-colors leading-snug">
                    {leadItem.judul}
                  </h2>
                </button>
                <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                  {leadItem.ringkasan}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectArticle(leadItem)}
                    className="text-xs font-semibold text-[#1E3A8A] hover:underline cursor-pointer"
                  >
                    Baca Selengkapnya
                  </button>
                  {isOperatorMode && leadItem.kustom && (
                    <button
                      type="button"
                      onClick={() => onDeleteArticle(leadItem.id)}
                      className="inline-flex items-center gap-1 text-xs text-red-700 hover:underline cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Hapus</span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          )}

          {/* Tier 2: Secondary Features */}
          {secondaryItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-[#E2DDD4]">
              {secondaryItems.map((item) => (
                <article key={item.id} className="flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {item.gambarUrl && (
                      <button
                        type="button"
                        onClick={() => onSelectArticle(item)}
                        className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#E2DDD4] group cursor-pointer"
                      >
                        <PortalImage
                          src={item.gambarUrl}
                          alt={item.judul}
                          containerClassName="w-full h-full"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </button>
                    )}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
                      <span className="font-semibold text-[#B45309]">{item.kategori}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{item.tanggal}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectArticle(item)}
                      className="text-left group cursor-pointer"
                    >
                      <h3 className="font-display text-xl font-semibold text-[#1C1917] group-hover:text-[#1E3A8A] transition-colors leading-snug">
                        {item.judul}
                      </h3>
                    </button>
                    <p className="text-sm text-[#57534E] leading-relaxed">{item.ringkasan}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2">
                    <span className="text-[#57534E]">{item.penulis}</span>
                    {isOperatorMode && item.kustom && (
                      <button
                        type="button"
                        onClick={() => onDeleteArticle(item.id)}
                        className="inline-flex items-center gap-1 text-red-700 hover:underline cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Hapus</span>
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Tier 3: Compact Archive List */}
          {archiveItems.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-[#1C1917]">
                Arsip Pengumuman Lainnya
              </h2>
              <div className="divide-y divide-[#E2DDD4] border-y border-[#E2DDD4]">
                {archiveItems.map((item) => (
                  <div
                    key={item.id}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <button
                      type="button"
                      onClick={() => onSelectArticle(item)}
                      className="text-left group cursor-pointer space-y-1"
                    >
                      <div className="flex items-center gap-2 text-xs text-[#57534E]">
                        <span className="font-semibold text-[#1E3A8A]">{item.kategori}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{item.tanggal}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.waktuBaca}</span>
                      </div>
                      <h3 className="text-base font-semibold text-[#1C1917] group-hover:text-[#1E3A8A] transition-colors">
                        {item.judul}
                      </h3>
                    </button>

                    <div className="flex items-center gap-4 shrink-0">
                      <button
                        type="button"
                        onClick={() => onSelectArticle(item)}
                        className="text-xs font-semibold text-[#1E3A8A] hover:underline cursor-pointer"
                      >
                        Buka Artikel
                      </button>
                      {isOperatorMode && item.kustom && (
                        <button
                          type="button"
                          onClick={() => onDeleteArticle(item.id)}
                          className="text-xs text-red-700 hover:underline cursor-pointer"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
