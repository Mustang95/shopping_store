export function formatReal(num, curr) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })
    .format(num)
    .match(/^.(.*)$/)[0];
}
