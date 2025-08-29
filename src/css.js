const CSS = (e) => `
        :root {
            --primary-color: #4361ee;
            --primary-light: #4895ef;
            --primary-dark: #3f37c9;
            --secondary-color: #4cc9f0;
            --bg-color: #f8f9fa;
            --card-bg: #ffffff;
            --text-primary: #2b2d42;
            --text-secondary: #6c757d;
            --border-color: #e9ecef;
            --success-color: #4cc9f0;
            --error-color: #f72585;
            --warning-color: #f9c74f;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-image: url(${e.IMG});
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            background-color: var(--bg-color);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--text-primary);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            padding: 20px;
            align-items: center;
            position: relative; 
        }

        .container {
            position: relative;
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            max-width: 600px;
            width: 100%;
            padding: 1.5rem;
            border-radius: 24px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08),
                inset 0 0 0 1px rgba(255, 255, 255, 0.5);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            z-index: 1;
            margin-top: 40px;
        }

        .container:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12),
                inset 0 0 0 1px rgba(255, 255, 255, 0.8);
        }

        h1 {
            text-align: center;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .input-group {
            margin-bottom: 0.5rem;
        }

        .link-input {
            flex: 1;
            min-width: 0;
            margin-top: 0;
            padding: 12px 16px;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
            background-color: white;
        }

        .link-row {
            display: flex;
            align-items: center;
            position: relative;
            margin-bottom: 12px;
            gap: 12px;
        }

        .add-btn {
            flex-shrink: 0;
            width: 42px;
            height: 42px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            color: white;
            box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
            border: none;
            font-size: 1.2rem;
        }

        .add-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(67, 97, 238, 0.4);
        }

        label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--text-secondary);
            font-weight: 500;
            font-size: 0.95rem;
        }

        input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
            background-color: white;
        }

        input:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15),
                inset 0 2px 4px rgba(0, 0, 0, 0.03);
        }

        button {
            width: 100%;
            padding: 14px 24px;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 0.5rem;
            position: relative;
            overflow: hidden;
            box-shadow: 0 6px 16px rgba(67, 97, 238, 0.3);
        }

        button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: all 0.6s ease;
        }

        button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(67, 97, 238, 0.4);
        }

        button:hover::before {
            left: 100%;
        }

        button:active {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
        }

        #result {
            background-color: #f8f9fa;
            font-family: monospace;
            word-break: break-all;
            padding: 14px 16px !important;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            position: relative;
            transition: all 0.3s ease;
        }

        #result:hover {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
        }

        .github-corner {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1000; /* 确保 GitHub 角标始终在最上层 */
        }

        .github-corner svg {
            fill: var(--primary-color);
            color: var(--card-bg);
            position: absolute;
            top: 0;
            right: 0;
            border: 0;
            width: 80px;
            height: 80px;
            transition: transform 0.3s ease;
        }

        .github-corner:hover svg {
            transform: scale(1.1);
        }

        .github-corner:hover .octo-arm {
            animation: octocat-wave 560ms ease-in-out;
        }

        @keyframes octocat-wave {
            0%, 100% { transform: rotate(0); }
            20%, 60% { transform: rotate(-25deg); }
            40%, 80% { transform: rotate(10deg); }
        }

        .logo-title {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 0.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--border-color);
        }

        .beian-info {
            text-align: center;
            font-size: 13px;
            color: var(--text-secondary);
            margin-top: 0.5rem;
            padding-top: 0.5rem;
            border-top: 1px solid var(--border-color);
        }

        .beian-info a {
            color: var(--primary-color);
            text-decoration: none;
            border-bottom: 1px dashed var(--primary-color);
            padding-bottom: 2px;
            transition: all 0.3s ease;
        }

        .beian-info a:hover {
            border-bottom-style: solid;
            color: var(--primary-dark);
        }

        #qrcode {
            display: none;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
            padding: 15px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        #qrcode.show {
            display: flex; /* 有内容时显示 */
        }
        
        .template-selector {
            position: relative;
            margin-bottom: 0.5rem;
        }
        
        .template-toggle {
            padding: 14px 16px;
            background-color: rgba(67, 97, 238, 0.08);
            font-weight: 600;
            cursor: pointer;
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        
        .template-toggle:hover {
            background-color: rgba(67, 97, 238, 0.15);
            border-color: rgba(67, 97, 238, 0.2);
        }
        
        .template-toggle:after {
            content: "▶";
            font-size: 12px;
            transition: transform 0.3s ease;
            margin-left: 8px;
        }
        
        .template-toggle.collapsed:after {
            transform: rotate(90deg);
        }
        
        .template-options {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            z-index: 1000;
            background-color: white;
            border-radius: 0 0 12px 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            display: none;
            max-height: 250px;
            overflow-y: auto;
            border: 2px solid var(--border-color);
            border-top: none;
            transition: all 0.3s ease;
        }
        
        .template-options.show {
            display: block;
            animation: slideDown 0.3s ease-out;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .template-option {
            padding: 12px 20px;
            cursor: pointer;
            transition: all 0.2s ease;
            border-bottom: 1px solid var(--border-color);
            font-size: 0.95rem;
        }
        
        .template-option:last-child {
            border-bottom: none;
        }
        
        .template-option:hover {
            background-color: rgba(67, 97, 238, 0.1);
            padding-left: 24px;
        }
        
        .template-option.selected {
            background-color: rgba(67, 97, 238, 0.15);
            font-weight: 600;
            color: var(--primary-dark);
        }

        .config-toggle {
            display: flex;
            justify-content: center;
            margin-bottom: 0.5rem;
            background: rgba(67, 97, 238, 0.08);
            border-radius: 12px;
            padding: 6px;
            border: 2px solid transparent;
        }

        .toggle-option {
            padding: 10px 20px;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            text-align: center;
            flex: 1;
            position: relative;
            overflow: hidden;
            font-size: 0.95rem;
        }

        .toggle-option.active {
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            color: white;
            box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
        }

        .toggle-option:not(.active):hover {
            background-color: rgba(67, 97, 238, 0.15);
            transform: translateY(-1px);
        }

        .mode-options {
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .mode-options.active {
            display: block;
            opacity: 1;
            animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .tip-icon {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            font-weight: bold;
            font-size: 12px;
            cursor: pointer;
            user-select: none;
            transition: all 0.3s ease;
            box-shadow: 0 2px 6px rgba(67, 97, 238, 0.3);
        }

        .tip-icon:hover {
            transform: scale(1.1);
            box-shadow: 0 3px 8px rgba(67, 97, 238, 0.4);
        }

        .tip-wrapper {
            position: relative;
            display: inline-block;
        }

        .tip-panel {
            opacity: 0;
            visibility: hidden;
            position: absolute;
            top: 28px;
            left: 0;
            min-width: 280px;
            max-width: 340px;
            max-height: 50vh;
            background: white;
            color: var(--text-primary);
            font-size: 14px;
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            white-space: normal;
            line-height: 1.6;
            overflow-y: auto;
            overflow-x: hidden;
            word-break: break-word;
            transition: all 0.3s ease;
            border: 2px solid var(--border-color);
        }

        .tip-panel::before {
            content: '';
            position: absolute;
            top: -10px;
            left: 10px;
            width: 20px;
            height: 20px;
            background: white;
            transform: rotate(45deg);
            border-top: 2px solid var(--border-color);
            border-left: 2px solid var(--border-color);
        }

        .tip-panel ul {
            margin: 8px 0;
            padding-left: 20px;
            list-style-type: disc;
        }

        .tip-panel li {
            margin-bottom: 6px;
        }

        .tip-panel strong, .tip-panel b {
            font-weight: bold;
            color: var(--primary-color);
            display: block;
            margin-top: 10px;
        }

        .tip-wrapper.active .tip-panel {
            opacity: 1;
            visibility: visible;
        }

        .protocol-options {
            display: flex;
            gap: 1px;
            margin-top: 12px;
            flex-wrap: wrap;
        }

        .protocol-checkbox {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            user-select: none;
            transition: all 0.3s ease;
            padding: 8px 12px;
            border-radius: 8px;
        }

        .protocol-checkbox:hover {
            background-color: rgba(67, 97, 238, 0.08);
        }

        .protocol-checkbox input {
            width: auto;
            margin: 0;
            cursor: pointer;
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
            .container {
                padding: 1.5rem;
                margin: 10px;
                border-radius: 20px;
            }
            
            h1 {
                font-size: 1.8rem;
            }
            
            .toggle-option {
                padding: 8px 12px;
                font-size: 0.9rem;
            }
            
            .protocol-options {
                gap: 1px;
            }
        }

        @media (max-width: 480px) {
            body {
                padding: 10px;
            }
            
            .container {
                padding: 1.5rem;
                border-radius: 16px;
            }
            
            h1 {
                font-size: 1.6rem;
            }
            
            .link-input {
                padding: 10px 12px;
                font-size: 0.9rem;
            }
            
            .add-btn {
                width: 38px;
                height: 38px;
                font-size: 1rem;
            }
            
            button {
                padding: 12px 20px;
                font-size: 0.95rem;
            }
        }
`;
export default CSS;
