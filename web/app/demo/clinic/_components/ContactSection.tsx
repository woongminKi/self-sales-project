"use client";

import { useState, type FormEvent } from "react";
import DemoAlertButton from "./DemoAlertButton";

export default function ContactSection() {
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    window.alert("데모입니다. 실제로 문의가 전송되지 않습니다.");
  }

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          예약 · 문의
        </h2>
        <p className="mt-2 text-slate-500">
          전화, 네이버 예약, 카카오톡 채널로 문의하시거나 아래 양식을
          남겨주세요.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <DemoAlertButton
            label="전화 상담 (02-000-0000)"
            className="rounded-xl border border-teal-200 px-4 py-3 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
          />
          <DemoAlertButton
            label="네이버 예약"
            className="rounded-xl border border-teal-200 px-4 py-3 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
          />
          <DemoAlertButton
            label="카카오톡 채널"
            className="rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              이름
            </label>
            <input
              type="text"
              placeholder="홍길동"
              className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              연락처
            </label>
            <input
              type="tel"
              placeholder="010-0000-0000"
              className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              문의 내용
            </label>
            <textarea
              rows={4}
              placeholder="문의하실 내용을 남겨주세요."
              className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <label className="flex items-start gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={agreePrivacy}
                onChange={(e) => setAgreePrivacy(e.target.checked)}
                className="mt-1"
              />
              <span>
                <span className="font-semibold text-slate-800">
                  [필수] 개인정보 수집·이용 동의
                </span>
                <br />
                수집 항목: 이름, 연락처, 문의 내용 / 수집 목적: 진료 예약 및
                문의 응대 / 보유 기간: 처리 완료 후 즉시 파기. 동의를 거부할
                권리가 있으며, 거부 시 문의 접수가 제한될 수 있습니다.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!agreePrivacy}
            className="w-full rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            문의 남기기
          </button>
        </form>
      </div>
    </section>
  );
}
