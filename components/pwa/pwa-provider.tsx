'use client';

import { PWAInstallPrompt } from './install-prompt';
import { OfflineIndicator } from './offline-indicator';

export function PWAProvider() {
  return (
    <>
      <OfflineIndicator />
      <PWAInstallPrompt />
    </>
  );
}