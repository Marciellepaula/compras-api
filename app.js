


document.getElementById('searchBtn').addEventListener('click', fetchSales);

async function () {
    const codigo = document.getElementById('search').value;
    const salesList = document.getElementById('salesList');
    salesList.innerHTML = ''; 


    try {
        await fetch('http://localhost/api/vendas/cliente/${codigo}', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json/',
                'Accept': 'application/json',
            }
        })
        .then((response) =>{
            if (!response.ok) {
                throw new Error('Erro ao buscar dados.');
            }

            const salesData = response.json();
            if (salesData.length === 0) {
                salesList.innerHTML = '<p>Nenhuma venda encontrada.</p>';
                return;
            }

            salesData.then((data) =>{
                data.forEach(sale => {
                    const saleItem = document.createElement('div');
                    saleItem.className = 'bg-white p-4 rounded shadow';
                    saleItem.innerHTML = `
                        <h2 class="font-semibold">Venda ID: ${sale.id}</h2>
                        <p>Total: R$ ${sale.total}</p>
                        <p>Data: ${new Date(sale.created_at).toLocaleDateString('pt-BR')}</p>
                    `;
                    salesList.appendChild(saleItem);
                });
            });
        });


    } catch (error) {
        salesList.innerHTML = `<p class="text-red-500">${error.message}</p>`;
    }
}