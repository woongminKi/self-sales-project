"use client";

export default function DemoAlertButton({
  label,
  className,
  message = "데모입니다. 실제로 예약·상담이 진행되지 않습니다.",
}: {
  label: string;
  className?: string;
  message?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.alert(message)}
      className={className}
    >
      {label}
    </button>
  );
}
