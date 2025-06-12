<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpFoundation\RequestStack;

class JWTCreatedListener
{
    private $requestStack;

    public function __construct(RequestStack $requestStack)
    {
        $this->requestStack = $requestStack;
    }

    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $request = $this->requestStack->getCurrentRequest();
        $payload = $event->getData();
        $user = $event->getUser();

        // Agregar información adicional al token
        $payload['user_id'] = $user->getId();
        $payload['email'] = $user->getEmail();
        
        // Si es un User, agregar info de la compañía
        if (method_exists($user, 'getCompany') && $user->getCompany()) {
            $payload['company_id'] = $user->getCompany()->getId();
            $payload['company_name'] = $user->getCompany()->getName();
            $payload['user_type'] = 'user';
        } else if (get_class($user) === 'App\Entity\Company') {
            // Si es una Company
            $payload['company_id'] = $user->getId();
            $payload['company_name'] = $user->getName();
            $payload['user_type'] = 'company';
        }

        if ($request) {
            $payload['ip'] = $request->getClientIp();
        }

        $event->setData($payload);
    }
}
