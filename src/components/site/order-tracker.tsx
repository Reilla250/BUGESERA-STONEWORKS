export const orderStatusSteps = [
  {
    key: "PENDING_PAYMENT",
    label: "Order placed",
    detail: "Your order has been received and is waiting for payment confirmation.",
  },
  {
    key: "PAID",
    label: "Payment confirmed",
    detail: "The payment is complete and production scheduling can begin.",
  },
  {
    key: "PROCESSING",
    label: "Processing",
    detail: "We are cutting, grading, or preparing your selected materials for dispatch.",
  },
  {
    key: "DELIVERED",
    label: "Delivered",
    detail: "Your order has left the yard and is on site or ready for collection.",
  },
] as const;

export function getOrderStatusMeta(status: string) {
  const step = orderStatusSteps.find((entry) => entry.key === status);
  return step ?? { key: "PENDING_PAYMENT", label: "Order placed", detail: "Your order is being prepared." };
}

export function OrderTracker({ status }: { status: string }) {
  const currentIndex = status === "CANCELLED" ? -1 : orderStatusSteps.findIndex((step) => step.key === status);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {orderStatusSteps.map((step, index) => {
          const isDone = status === "CANCELLED" ? false : index <= safeIndex;
          const isCurrent = status !== "CANCELLED" && index === safeIndex;

          return (
            <div key={step.key} className="rounded-2xl border border-granite/15 bg-slate/50 p-3">
              <div className="flex items-center gap-3">
                <span
                  className={[
                    "flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold",
                    isDone ? "bg-hivis text-basalt" : "bg-granite/10 text-granite",
                    isCurrent ? "ring-2 ring-hivis/40" : "",
                  ].join(" ")}
                >
                  {index + 1}
                </span>
                <span className={isDone ? "text-sm font-semibold text-basalt" : "text-sm text-granite"}>{step.label}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-granite">{step.detail}</p>
            </div>
          );
        })}
      </div>
      {status === "CANCELLED" && <p className="text-sm font-medium text-laterite">This order was cancelled and is no longer active.</p>}
    </div>
  );
}
