export default function AuthPlaceholderCard() {
  return (
    <div className="mx-auto w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-semibold">
        Sign in / Sign up
      </h3>

      <form className="space-y-4 opacity-60">
        <input
          disabled
          type="email"
          placeholder="name@company.com"
          className="w-full rounded border border-gray-300 px-3 py-2 text-gray-500 bg-gray-50"
        />

        <select 
          disabled 
          className="w-full rounded border border-gray-300 px-3 py-2 text-gray-500 bg-gray-50"
          defaultValue=""
        >
          <option value="">Select Persona</option>
          <option value="SME">Business</option>
          <option value="Consultant">Consultant</option>
          <option value="Vendor">Vendor</option>
        </select>

        <button
          disabled
          className="w-full rounded bg-gray-400 py-3 font-medium text-white opacity-60 cursor-not-allowed"
        >
          Continue (Coming Soon)
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-gray-500 leading-relaxed">
        This placeholder will be replaced by Supabase social login shortly.
      </p>
    </div>
  );
}