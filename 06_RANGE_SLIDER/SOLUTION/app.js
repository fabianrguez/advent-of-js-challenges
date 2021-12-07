const priceRange = document.querySelector('#priceRange');
const dollarsElement = document.querySelector('.amount .dollars');

function formatNumber(number) {
  return (+number).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function handlePriceRange() {
  dollarsElement.textContent = `${formatNumber(this.value)}`;
}

priceRange.addEventListener('input', handlePriceRange);
