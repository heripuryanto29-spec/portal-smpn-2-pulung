import { useMemo, useState, type FormEvent } from 'react';
import { CheckCircle2, Clock, AlertCircle, Printer, Search } from 'lucide-react';
import { PPDB_QUOTAS, SCHOOL_INFO } from '../data/schoolData';
import { PpdbStatus, PpdbSubmission, PpdbTrack } from '../types/portal';

interface PpdbViewProps {
  submissions: PpdbSubmission[];
  isOperatorMode: boolean;
  onAddSubmission: (
    data: Omit<PpdbSubmission, 'noRegistrasi' | 'tanggalDaftar' | 'statusVerifikasi'>
  ) => PpdbSubmission;
  onUpdateStatus: (noRegistrasi: string, status: PpdbStatus, catatan: string) => void;
}

type PpdbTab = 'daftar' | 'status' | 'rekap';

export function PpdbView({
  submissions,
  isOperatorMode,
  onAddSubmission,
  onUpdateStatus,
}: PpdbViewProps) {
  const [activeTab, setActiveTab] = useState<PpdbTab>('daftar');

  // Form states
  const [nisn, setNisn] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [asalSekolah, setAsalSekolah] = useState('');
  const [jalur, setJalur] = useState<PpdbTrack>('Zonasi');
  const [nilaiRataRapor, setNilaiRataRapor] = useState('');
  const [namaWali, setNamaWali] = useState('');
  const [noTelepon, setNoTelepon] = useState('');
  const [alamatDesa, setAlamatDesa] = useState('');
  const [kecamatan, setKecamatan] = useState('Pulung');
  const [formError, setFormError] = useState('');
  const [createdReceipt, setCreatedReceipt] = useState<PpdbSubmission | null>(null);

  // Status checker states
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState<PpdbSubmission | null | 'not-found'>(null);

  const totalSeats = useMemo(
    () => PPDB_QUOTAS.reduce((acc, q) => acc + q.kuotaKursi, 0),
    []
  );

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    const cleanNisn = nisn.replace(/\D/g, '');
    const cleanPhone = noTelepon.replace(/\D/g, '');

    if (cleanNisn.length !== 10) {
      setFormError('NISN wajib terdiri dari tepat 10 digit angka.');
      return;
    }
    if (
      !namaLengkap.trim() ||
      !tempatLahir.trim() ||
      !tanggalLahir ||
      !asalSekolah.trim() ||
      !namaWali.trim() ||
      !alamatDesa.trim()
    ) {
      setFormError('Seluruh kolom bertanda wajib diisi dengan lengkap.');
      return;
    }
    if (cleanPhone.length < 10 || cleanPhone.length > 14) {
      setFormError('Nomor WhatsApp orang tua/wali harus 10–14 digit angka.');
      return;
    }
    const existingNisn = submissions.find((s) => s.nisn === cleanNisn);
    if (existingNisn) {
      setFormError(
        `NISN ${cleanNisn} sudah terdaftar dengan nomor registrasi ${existingNisn.noRegistrasi}. Silakan cek pada tab Cek Status.`
      );
      return;
    }

    setFormError('');
    const created = onAddSubmission({
      nisn: cleanNisn,
      namaLengkap: namaLengkap.trim(),
      jenisKelamin,
      tempatLahir: tempatLahir.trim(),
      tanggalLahir,
      asalSekolah: asalSekolah.trim(),
      jalur,
      nilaiRataRapor: nilaiRataRapor.trim() || '-',
      namaWali: namaWali.trim(),
      noTelepon: cleanPhone,
      alamatDesa: alamatDesa.trim(),
      kecamatan: kecamatan.trim() || 'Pulung',
    });

    setCreatedReceipt(created);
    setNisn('');
    setNamaLengkap('');
    setTempatLahir('');
    setTanggalLahir('');
    setAsalSekolah('');
    setNilaiRataRapor('');
    setNamaWali('');
    setNoTelepon('');
    setAlamatDesa('');
  };

  const handleLookup = (e: FormEvent) => {
    e.preventDefault();
    const q = lookupQuery.trim().toLowerCase();
    if (!q) return;
    const found = submissions.find(
      (s) => s.noRegistrasi.toLowerCase() === q || s.nisn === q
    );
    setLookupResult(found || 'not-found');
  };

  const renderStatusBadge = (status: PpdbStatus) => {
    if (status === 'Terverifikasi') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
          <span>Terverifikasi Panitia</span>
        </span>
      );
    }
    if (status === 'Perlu Perbaikan Berkas') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-800">
          <AlertCircle className="w-4 h-4 text-red-700" aria-hidden="true" />
          <span>Perlu Perbaikan Berkas</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B45309]">
        <Clock className="w-4 h-4 text-[#B45309]" aria-hidden="true" />
        <span>Menunggu Verifikasi Berkas</span>
      </span>
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header PPDB */}
      <section className="border-b border-[#E2DDD4] pb-10 no-print">
        <p className="text-xs font-medium text-[#B45309] mb-2">
          Tahun Ajaran 2026/2027 · Daya Tampung {totalSeats} Peserta Didik
        </p>
        <h1
          className="font-display font-bold text-[#1C1917] leading-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
        >
          Penerimaan Peserta Didik Baru (PPDB)
        </h1>
        <p className="text-base text-[#57534E] max-w-2xl leading-relaxed">
          Pendaftaran peserta didik baru {SCHOOL_INFO.namaResmi} dilaksanakan secara transparan melalui empat jalur resmi. Simpan nomor registrasi setelah mendaftar untuk melakukan pengecekan status verifikasi berkas.
        </p>
      </section>

      {/* Ringkasan Kuota 4 Jalur */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 no-print">
        {PPDB_QUOTAS.map((q) => (
          <div
            key={q.jalur}
            className="bg-white border border-[#E2DDD4] rounded-lg p-5 space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h2 className="font-display text-lg font-semibold text-[#1C1917]">{q.jalur}</h2>
                <span className="font-mono-tabular text-sm font-semibold text-[#1E3A8A]">
                  {q.persentase}%
                </span>
              </div>
              <p className="font-mono-tabular text-xs text-[#B45309] font-medium mb-2">
                Kuota {q.kuotaKursi} kursi
              </p>
              <p className="text-xs text-[#57534E] leading-relaxed">{q.syaratUtama}</p>
            </div>
            <p className="text-[11px] text-[#78716C] pt-3 border-t border-[#E2DDD4] leading-snug">
              {q.keterangan}
            </p>
          </div>
        ))}
      </section>

      {/* Tab Pengalih PPDB */}
      <section className="space-y-8">
        <div
          role="tablist"
          aria-label="Layanan PPDB"
          className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F2EFE9] border border-[#E2DDD4] rounded-lg no-print"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'daftar'}
            onClick={() => setActiveTab('daftar')}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'daftar'
                ? 'bg-white text-[#1E3A8A] font-semibold shadow-sm'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            Formulir Pendaftaran Online
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'status'}
            onClick={() => setActiveTab('status')}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'status'
                ? 'bg-white text-[#1E3A8A] font-semibold shadow-sm'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            Cek Status & Cetak Bukti
          </button>
          {isOperatorMode && (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'rekap'}
              onClick={() => setActiveTab('rekap')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'rekap'
                  ? 'bg-white text-[#1E3A8A] font-semibold shadow-sm'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              Rekap Panitia ({submissions.length})
            </button>
          )}
        </div>

        {/* Tab 1: Formulir Pendaftaran */}
        {activeTab === 'daftar' && (
          <div className="space-y-8">
            {createdReceipt && (
              <div className="bg-white border border-[#1E3A8A] rounded-lg p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DDD4] pb-4">
                  <div>
                    <p className="text-xs font-semibold text-emerald-800 mb-1">
                      Pendaftaran Berhasil Disimpan
                    </p>
                    <h2 className="font-display text-2xl font-bold text-[#1C1917]">
                      Bukti Registrasi PPDB {SCHOOL_INFO.namaResmi}
                    </h2>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-[#57534E]">Nomor Registrasi</p>
                    <p className="font-mono-tabular text-xl font-bold text-[#1E3A8A]">
                      {createdReceipt.noRegistrasi}
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <dt className="text-xs text-[#57534E]">Nama Lengkap</dt>
                    <dd className="font-semibold text-[#1C1917]">{createdReceipt.namaLengkap}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#57534E]">NISN</dt>
                    <dd className="font-mono-tabular font-semibold text-[#1C1917]">
                      {createdReceipt.nisn}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#57534E]">Asal SD / MI</dt>
                    <dd className="font-medium text-[#1C1917]">{createdReceipt.asalSekolah}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#57534E]">Jalur Pilihan</dt>
                    <dd className="font-medium text-[#1E3A8A]">{createdReceipt.jalur}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#57534E]">Alamat</dt>
                    <dd className="text-[#1C1917]">
                      {createdReceipt.alamatDesa}, Kec. {createdReceipt.kecamatan}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#57534E]">Status Saat Ini</dt>
                    <dd>{renderStatusBadge(createdReceipt.statusVerifikasi)}</dd>
                  </div>
                </dl>

                <div className="pt-4 border-t border-[#E2DDD4] flex flex-wrap items-center justify-between gap-4 no-print">
                  <p className="text-xs text-[#57534E]">
                    Harap membawa bukti ini beserta fotokopi Kartu Keluarga dan SKL saat verifikasi ke Posko Tata Usaha Desa Kesugihan.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#172E6E] rounded-md cursor-pointer"
                    >
                      <Printer className="w-4 h-4" aria-hidden="true" />
                      <span>Cetak Bukti</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCreatedReceipt(null)}
                      className="px-4 py-2 text-xs font-medium text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmitForm}
              className="bg-white border border-[#E2DDD4] rounded-lg p-6 sm:p-8 space-y-6 no-print"
            >
              <div className="border-b border-[#E2DDD4] pb-4">
                <h2 className="font-display text-2xl font-semibold text-[#1C1917]">
                  Formulir Biodata Calon Peserta Didik
                </h2>
                <p className="text-xs text-[#57534E] mt-1">
                  Lengkapi seluruh data sesuai ijazah SD/MI atau akta kelahiran yang sah.
                </p>
              </div>

              {formError && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 text-sm text-red-800 bg-red-50 border border-red-200 rounded-md px-4 py-3"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="ppdb-nisn" className="block text-xs font-semibold text-[#1C1917]">
                    NISN (10 Digit Angka) *
                  </label>
                  <input
                    id="ppdb-nisn"
                    type="text"
                    inputMode="numeric"
                    maxLength={10}
                    value={nisn}
                    onChange={(e) => setNisn(e.target.value.replace(/\D/g, ''))}
                    placeholder="Contoh: 0134567890"
                    className="w-full px-3.5 py-2.5 text-sm font-mono-tabular bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="ppdb-nama" className="block text-xs font-semibold text-[#1C1917]">
                    Nama Lengkap Calon Siswa *
                  </label>
                  <input
                    id="ppdb-nama"
                    type="text"
                    value={namaLengkap}
                    onChange={(e) => setNamaLengkap(e.target.value)}
                    placeholder="Sesuai Akta Kelahiran"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="ppdb-jk" className="block text-xs font-semibold text-[#1C1917]">
                    Jenis Kelamin *
                  </label>
                  <select
                    id="ppdb-jk"
                    value={jenisKelamin}
                    onChange={(e) => setJenisKelamin(e.target.value as 'Laki-laki' | 'Perempuan')}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label htmlFor="ppdb-tpl" className="block text-xs font-semibold text-[#1C1917]">
                      Tempat Lahir *
                    </label>
                    <input
                      id="ppdb-tpl"
                      type="text"
                      value={tempatLahir}
                      onChange={(e) => setTempatLahir(e.target.value)}
                      placeholder="Ponorogo"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="ppdb-tgl" className="block text-xs font-semibold text-[#1C1917]">
                      Tanggal Lahir *
                    </label>
                    <input
                      id="ppdb-tgl"
                      type="date"
                      value={tanggalLahir}
                      onChange={(e) => setTanggalLahir(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm font-mono-tabular bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="ppdb-asal" className="block text-xs font-semibold text-[#1C1917]">
                    Asal Sekolah (SD / MI) *
                  </label>
                  <input
                    id="ppdb-asal"
                    type="text"
                    value={asalSekolah}
                    onChange={(e) => setAsalSekolah(e.target.value)}
                    placeholder="Contoh: SDN 1 Kesugihan"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label htmlFor="ppdb-jalur" className="block text-xs font-semibold text-[#1C1917]">
                      Jalur Pendaftaran *
                    </label>
                    <select
                      id="ppdb-jalur"
                      value={jalur}
                      onChange={(e) => setJalur(e.target.value as PpdbTrack)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                    >
                      <option value="Zonasi">Zonasi</option>
                      <option value="Prestasi">Prestasi</option>
                      <option value="Afirmasi">Afirmasi</option>
                      <option value="Perpindahan Tugas">Perpindahan Tugas</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="ppdb-nilai" className="block text-xs font-semibold text-[#1C1917]">
                      Rata-rata Rapor (Opsional)
                    </label>
                    <input
                      id="ppdb-nilai"
                      type="text"
                      value={nilaiRataRapor}
                      onChange={(e) => setNilaiRataRapor(e.target.value)}
                      placeholder="Contoh: 87.5"
                      className="w-full px-3.5 py-2.5 text-sm font-mono-tabular bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="ppdb-wali" className="block text-xs font-semibold text-[#1C1917]">
                    Nama Orang Tua / Wali *
                  </label>
                  <input
                    id="ppdb-wali"
                    type="text"
                    value={namaWali}
                    onChange={(e) => setNamaWali(e.target.value)}
                    placeholder="Nama ayah, ibu, atau wali"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="ppdb-wa" className="block text-xs font-semibold text-[#1C1917]">
                    Nomor Telepon / WhatsApp Aktif *
                  </label>
                  <input
                    id="ppdb-wa"
                    type="tel"
                    value={noTelepon}
                    onChange={(e) => setNoTelepon(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-3.5 py-2.5 text-sm font-mono-tabular bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="ppdb-desa" className="block text-xs font-semibold text-[#1C1917]">
                    Alamat Dusun & Desa *
                  </label>
                  <input
                    id="ppdb-desa"
                    type="text"
                    value={alamatDesa}
                    onChange={(e) => setAlamatDesa(e.target.value)}
                    placeholder="Contoh: Dusun Krajan, Desa Kesugihan"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="ppdb-kec" className="block text-xs font-semibold text-[#1C1917]">
                    Kecamatan
                  </label>
                  <input
                    id="ppdb-kec"
                    type="text"
                    value={kecamatan}
                    onChange={(e) => setKecamatan(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2DDD4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-[#57534E]">
                  Dengan mengirimkan formulir ini, wali murid menyatakan seluruh keterangan yang diisi adalah benar.
                </p>
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172E6E] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Kirim Pendaftaran PPDB
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Cek Status Pendaftaran */}
        {activeTab === 'status' && (
          <div className="space-y-6">
            <form
              onSubmit={handleLookup}
              className="bg-white border border-[#E2DDD4] rounded-lg p-6 space-y-4 no-print"
            >
              <div className="space-y-1">
                <h2 className="font-display text-xl font-semibold text-[#1C1917]">
                  Lacak Status Verifikasi Berkas
                </h2>
                <p className="text-xs text-[#57534E]">
                  Masukkan Nomor Registrasi (misal{' '}
                  <button
                    type="button"
                    onClick={() => setLookupQuery('PPDB-2026-0001')}
                    className="font-mono-tabular font-semibold text-[#1E3A8A] hover:underline cursor-pointer"
                  >
                    PPDB-2026-0001
                  </button>
                  ) atau NISN 10 digit (misal{' '}
                  <button
                    type="button"
                    onClick={() => setLookupQuery('0139876543')}
                    className="font-mono-tabular font-semibold text-[#1E3A8A] hover:underline cursor-pointer"
                  >
                    0139876543
                  </button>
                  ).
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search
                    className="w-4 h-4 text-[#57534E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    value={lookupQuery}
                    onChange={(e) => setLookupQuery(e.target.value)}
                    placeholder="Masukkan Nomor Registrasi atau NISN..."
                    aria-label="Nomor Registrasi atau NISN"
                    className="w-full pl-10 pr-4 py-2.5 text-sm font-mono-tabular bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-[#172E6E] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Periksa Status
                </button>
              </div>
            </form>

            {lookupResult === 'not-found' && (
              <div className="bg-white border border-[#E2DDD4] rounded-lg p-6 text-center space-y-2">
                <p className="text-base font-semibold text-[#1C1917]">
                  Data pendaftaran tidak ditemukan
                </p>
                <p className="text-sm text-[#57534E]">
                  Pastikan nomor registrasi atau 10 digit NISN yang dimasukkan sudah sesuai.
                </p>
              </div>
            )}

            {lookupResult && lookupResult !== 'not-found' && (
              <div className="bg-white border border-[#E2DDD4] rounded-lg p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DDD4] pb-4">
                  <div>
                    <p className="font-mono-tabular text-xs font-semibold text-[#1E3A8A]">
                      {lookupResult.noRegistrasi}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-[#1C1917] mt-0.5">
                      {lookupResult.namaLengkap}
                    </h3>
                  </div>
                  <div>{renderStatusBadge(lookupResult.statusVerifikasi)}</div>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <dt className="text-xs text-[#57534E]">NISN</dt>
                    <dd className="font-mono-tabular font-semibold text-[#1C1917]">
                      {lookupResult.nisn}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#57534E]">Asal SD / MI</dt>
                    <dd className="font-medium text-[#1C1917]">{lookupResult.asalSekolah}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#57534E]">Jalur Pendaftaran</dt>
                    <dd className="font-medium text-[#1E3A8A]">{lookupResult.jalur}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#57534E]">Tanggal Daftar</dt>
                    <dd className="font-mono-tabular text-[#1C1917]">
                      {lookupResult.tanggalDaftar}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#57534E]">Wali Murid & Kontak</dt>
                    <dd className="text-[#1C1917]">
                      {lookupResult.namaWali} ·{' '}
                      <span className="font-mono-tabular">{lookupResult.noTelepon}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#57534E]">Domisili</dt>
                    <dd className="text-[#1C1917]">
                      {lookupResult.alamatDesa}, Kec. {lookupResult.kecamatan}
                    </dd>
                  </div>
                </dl>

                {lookupResult.catatanPanitia && (
                  <div className="bg-[#F2EFE9] border border-[#E2DDD4] rounded-md p-4 text-xs text-[#1C1917]">
                    <span className="font-semibold">Catatan Panitia:</span>{' '}
                    {lookupResult.catatanPanitia}
                  </div>
                )}

                <div className="pt-2 flex justify-end no-print">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#172E6E] rounded-md cursor-pointer"
                  >
                    <Printer className="w-4 h-4" aria-hidden="true" />
                    <span>Cetak Bukti Pendaftaran</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Rekap Panitia (Mode Operator) */}
        {activeTab === 'rekap' && isOperatorMode && (
          <div className="bg-white border border-[#E2DDD4] rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E2DDD4] flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-[#1C1917]">
                Daftar Pendaftar Masuk ({submissions.length})
              </h2>
              <span className="text-xs font-medium text-[#1E3A8A]">Panel Verifikasi Operator</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#F2EFE9] border-b border-[#E2DDD4] text-xs text-[#57534E]">
                    <th className="py-3 px-4 font-semibold">No. Registrasi</th>
                    <th className="py-3 px-4 font-semibold">Nama & NISN</th>
                    <th className="py-3 px-4 font-semibold">Asal SD/MI</th>
                    <th className="py-3 px-4 font-semibold">Jalur</th>
                    <th className="py-3 px-4 font-semibold">Status Verifikasi</th>
                    <th className="py-3 px-4 font-semibold">Ubah Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2DDD4]">
                  {submissions.map((sub) => (
                    <tr key={sub.noRegistrasi} className="align-top">
                      <td className="py-3.5 px-4 font-mono-tabular text-xs font-semibold text-[#1E3A8A] whitespace-nowrap">
                        {sub.noRegistrasi}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-[#1C1917]">{sub.namaLengkap}</p>
                        <p className="font-mono-tabular text-xs text-[#57534E]">NISN {sub.nisn}</p>
                      </td>
                      <td className="py-3.5 px-4 text-[#57534E]">{sub.asalSekolah}</td>
                      <td className="py-3.5 px-4 font-medium text-[#1C1917] whitespace-nowrap">
                        {sub.jalur}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {renderStatusBadge(sub.statusVerifikasi)}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          aria-label={`Ubah status ${sub.namaLengkap}`}
                          value={sub.statusVerifikasi}
                          onChange={(e) => {
                            const nextStatus = e.target.value as PpdbStatus;
                            const note =
                              nextStatus === 'Terverifikasi'
                                ? 'Berkas lengkap dan telah diverifikasi panitia.'
                                : nextStatus === 'Perlu Perbaikan Berkas'
                                  ? 'Mohon melengkapi salinan dokumen di ruang TU.'
                                  : 'Menunggu jadwal verifikasi fisik.';
                            onUpdateStatus(sub.noRegistrasi, nextStatus, note);
                          }}
                          className="px-2.5 py-1.5 text-xs bg-[#FBF9F5] border border-[#E2DDD4] rounded-md focus:outline-none focus:border-[#1E3A8A]"
                        >
                          <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                          <option value="Terverifikasi">Terverifikasi</option>
                          <option value="Perlu Perbaikan Berkas">Perlu Perbaikan Berkas</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
