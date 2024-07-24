"use client";

import { useEffect } from 'react';
import Modal from 'react-modal';

export default function ModalSetup() {
  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  return null;
}
