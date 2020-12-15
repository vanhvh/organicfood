import React from 'react';
import './footer.css';

/**
 * @author
 * @function Footer
 **/

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row rowgutter">
                    <div className="col--12">
                        <span>
                            © Viet-Hung 2020 -&nbsp;
                            <a href="https://www.facebook.com/profile.php?id=100010434452732">
                                VietAnh
                            </a>
                            &nbsp; &&nbsp;
                            <a href="https://www.facebook.com/ngocnam.pham.879">
                                NgocNam
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
