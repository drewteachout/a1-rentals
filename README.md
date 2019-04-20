# a1-rentals
Website redesign for A1 rentals. Done in Angular



**Release Notes aonerentals.com Version 1.0**



*   New features
    *   Linking between tiles (on the Popular Products and Rental Products pages) and their respective product pages.  Aka the site is now navigable.
    *   Admin manager now works for packages
    *   Product tabs now reflect database ordering
    *   It is now more obvious when the admin logs in successfully
    *   In Admin site, product group ordering is now draggable.
*   Bug fixes
    *   The menu would revert to an old format if View Quote was selected.  Our undead menu has been killed once and for all.
    *   Contact Us UI now reflects the database structure.
*   Known bugs
    *   Product page images are not fit to their frame
    *   Product group and subgroup images are (hilariously) squished into a square frame
    *   Product page image scrolling arrows are overtop the menu dropdowns, causing the menu to close when the mouse goes over the arrow.
    *   Default values needed for products with blank entries for price, quantity, etc.

**Install Information**

The following is a description of how to host the site on aonerentals.com once you are ready to do so. The majority of the hosting process has been already completed, only the domain name transfer from squarespace and billing information need to be completed. For any clarification, feel free to reach out to the team members listed under the Troubleshooting section.



*   Pre-requisites
    *   In order to set up the aonerentals we will need a functioning computer with an internet connection.
*   Instructions
    *   **Domain Name**
        *   In order for the website to display the correct url in the address bar, we need to setup domain fowarding. Complete the steps in this [article](https://support.squarespace.com/hc/en-us/articles/214767107). 
            *   In step 4, replace what was previously in the field with “[https://a1-rentals.firebaseapp.com](https://a1-rentals.firebaseapp.com/Popular%20Products)”
        *   Additionally, we need to set up the custom domain with Firebase -- complete the instructions in this [article](https://firebase.google.com/docs/hosting/custom-domain).
            *   In the “custom domain” field, enter “www.aonerentals.com”
    *   **Billing**
        *   In order to set up automatic monthly payments for the website hosting, follow the steps in this [article](https://cloud.google.com/billing/docs/how-to/payment-methods), entering your credit card information when prompted.
*   Troubleshooting
    *   For assistance with issues with Firebase, contact Firebase support here:
        *   [https://firebase.google.com/support/](https://firebase.google.com/support/)
    *   For any other questions, contact Conor Brownell at [cbrownell24@gmail.com](mailto:cbrownell24@gmail.com), or William Lim at [limwilliam23@gmail.com](mailto:limwilliam23@gmail.com).
