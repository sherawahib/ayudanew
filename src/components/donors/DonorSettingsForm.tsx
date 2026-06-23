"use client";

import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { inputClass } from "@/components/donors/SocialAuthButtons";

export default function DonorSettingsForm() {
  const { data: session, update } = useSession();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [postAmount, setPostAmount] = useState(true);
  const [postName, setPostName] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user) return;
    setFirstName(session.user.firstName ?? "");
    setLastName(session.user.lastName ?? "");
    setOrgName(session.user.orgName ?? "");
    setPostAmount(session.user.postAmount ?? true);
    setPostName(session.user.postName ?? true);
  }, [session]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/donors/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          orgName,
          postAmount,
          postName,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to save settings.");
      }

      await update({
        user: {
          ...session?.user,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          orgName: data.user.orgName,
          name: data.user.name,
          postAmount: data.user.postAmount,
          postName: data.user.postName,
        },
      });

      setMessage("Your settings have been saved.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const isOrganization = session?.user?.accountType === "organization";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="rounded-md border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="font-[family-name:var(--font-lora)] text-xl text-[#0f2d52]">Profile</h2>
        <p className="mt-1 text-sm text-ayuda-gray">Update your account details.</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="settings-first-name" className="mb-1.5 block text-sm font-medium">
              First name
            </label>
            <input
              id="settings-first-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="settings-last-name" className="mb-1.5 block text-sm font-medium">
              Last name
            </label>
            <input
              id="settings-last-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {isOrganization ? (
          <div className="mt-4">
            <label htmlFor="settings-org" className="mb-1.5 block text-sm font-medium">
              Organization
            </label>
            <input
              id="settings-org"
              value={orgName}
              onChange={(event) => setOrgName(event.target.value)}
              className={inputClass}
            />
          </div>
        ) : null}

        <p className="mt-4 text-sm text-ayuda-gray">
          Email: <span className="font-medium text-black">{session?.user?.email}</span>
        </p>
      </section>

      <section className="overflow-hidden rounded-md bg-[#3d4349] p-6 text-white shadow-sm">
        <h2 className="font-[family-name:var(--font-lora)] text-xl">Public recognition</h2>
        <p className="mt-1 text-sm text-white/75">
          Choose what appears on our donor recognition lists.
        </p>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:gap-8">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={postAmount}
              onChange={(event) => setPostAmount(event.target.checked)}
              className="mt-0.5 h-5 w-5 accent-[#1261ab]"
            />
            <span className="text-sm">Post my donation amount</span>
          </label>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={postName}
              onChange={(event) => setPostName(event.target.checked)}
              className="mt-0.5 h-5 w-5 accent-[#1261ab]"
            />
            <span className="text-sm">Post my name</span>
          </label>
        </div>
      </section>

      {message ? (
        <p className="rounded-sm border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="bg-ayuda-blue px-8 py-3 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-ayuda-blue-dark disabled:opacity-60"
      >
        {loading ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
