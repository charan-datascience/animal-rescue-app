// Donation page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const amountBtns = document.querySelectorAll('.amount-btn');
    const amountInput = document.getElementById('amount');
    const impactMessage = document.getElementById('impactMessage');
    const impactText = impactMessage ? impactMessage.querySelector('.impact-text') : null;

    // Amount button selection
    amountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            amountBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set the amount in input
            const amount = this.getAttribute('data-amount');
            amountInput.value = amount;
            
            // Update impact message
            updateImpactMessage(parseFloat(amount));
        });
    });

    // Custom amount input
    if (amountInput) {
        amountInput.addEventListener('input', function() {
            // Remove active class from all buttons
            amountBtns.forEach(b => b.classList.remove('active'));
            
            // Update impact message
            const amount = parseFloat(this.value);
            if (amount > 0) {
                updateImpactMessage(amount);
            } else {
                hideImpactMessage();
            }
        });

        // Trigger on page load if value exists
        const initialAmount = parseFloat(amountInput.value);
        if (initialAmount > 0) {
            updateImpactMessage(initialAmount);
        }
    }

    // Update impact message based on amount
    function updateImpactMessage(amount) {
        if (!impactMessage || !impactText) return;

        let message = '';
        
        if (amount >= 250) {
            message = `Your generous $${amount} donation provides comprehensive care for an animal's full recovery!`;
        } else if (amount >= 100) {
            message = `Amazing! $${amount} supports a complete rescue operation.`;
        } else if (amount >= 50) {
            message = `Thank you! $${amount} covers emergency treatment for an injured animal.`;
        } else if (amount >= 25) {
            message = `Great! $${amount} provides a basic medical checkup.`;
        } else if (amount >= 10) {
            message = `Wonderful! $${amount} feeds one animal for a week.`;
        } else if (amount > 0) {
            message = `Every dollar helps! Your $${amount} contribution makes a difference.`;
        }

        if (message) {
            impactText.textContent = message;
            impactMessage.classList.add('show');
        }
    }

    // Hide impact message
    function hideImpactMessage() {
        if (impactMessage) {
            impactMessage.classList.remove('show');
        }
    }

    // Form validation
    const donateForm = document.getElementById('donateForm');
    if (donateForm) {
        donateForm.addEventListener('submit', function(e) {
            const amount = parseFloat(amountInput.value);
            
            if (!amount || amount <= 0) {
                e.preventDefault();
                alert('Please enter a valid donation amount.');
                amountInput.focus();
                return false;
            }

            if (amount < 1) {
                e.preventDefault();
                alert('Minimum donation amount is $1.');
                amountInput.focus();
                return false;
            }

            // Show thank you message (in production, this would redirect to payment)
            // For demo purposes, we'll just show confirmation
            return true;
        });
    }

    // Animate donor list on scroll
    const donorItems = document.querySelectorAll('.donor-item');
    if (donorItems.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.5s ease forwards';
                }
            });
        }, observerOptions);

        donorItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.animationDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
    }
});

// Add fadeInUp animation if not already in CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
