
const PUBLIC_DOMAIN = 'https://pub-edb0dfe680944457a6f4daab89bcf28f.r2.dev';
const FILE_KEY = 'r2-connection-test.txt';

async function checkPublicAccess() {
    const url = `${PUBLIC_DOMAIN}/${FILE_KEY}`;
    console.log(`Checking access to: ${url}`);

    try {
        const response = await fetch(url);
        if (response.ok) {
            const text = await response.text();
            console.log('SUCCESS! File is accessible.');
            console.log('Content:', text);
        } else {
            console.error(`FAILED: Status ${response.status}`);
        }
    } catch (err) {
        console.error('Network Error:', err.message);
    }
}

checkPublicAccess();
