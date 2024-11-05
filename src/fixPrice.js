export default function fixPrice(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}
