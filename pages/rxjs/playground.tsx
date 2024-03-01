'use client'

import React, { useEffect } from 'react'
import Layout from '@/app/components/Layout'
import { connectable, of, from, Subject, interval, BehaviorSubject } from 'rxjs'
import { tap, take } from 'rxjs/operators'
import { Tips } from '@/app/components/Tips'

export default function C() {
    return (
        <Layout>
            <Tips>rxjs playground</Tips>
        </Layout>
    )
}
