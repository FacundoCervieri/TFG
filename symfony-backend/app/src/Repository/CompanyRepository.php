<?php

namespace App\Repository;

use App\Entity\Company;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

class CompanyRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Company::class);
    }

    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof Company) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', $user::class));
        }

        $user->setPassword($newHashedPassword);
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }

    public function findActiveCompanies(): array
    {
        return $this->createQueryBuilder('c')
            ->where('c.isActive = :active')
            ->setParameter('active', true)
            ->orderBy('c.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function findVerifiedCompanies(): array
    {
        return $this->createQueryBuilder('c')
            ->where('c.isActive = :active')
            ->andWhere('c.isVerified = :verified')
            ->setParameter('active', true)
            ->setParameter('verified', true)
            ->orderBy('c.companyName', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function findByEmail(string $email): ?Company
    {
        return $this->findOneBy(['email' => $email]);
    }

    public function findByTaxId(string $taxId): ?Company
    {
        return $this->findOneBy(['taxId' => $taxId]);
    }

    public function findBySector(string $sector): array
    {
        return $this->createQueryBuilder('c')
            ->where('c.sector = :sector')
            ->andWhere('c.isActive = :active')
            ->setParameter('sector', $sector)
            ->setParameter('active', true)
            ->orderBy('c.companyName', 'ASC')
            ->getQuery()
            ->getResult();
    }
}